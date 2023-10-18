import { Collapse, message } from "antd";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/app/loading";

const FrequentlyAskQusPage = () => {
  const {
    isLoading,
    error,
    data: faqData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/faq`)
        .then((res) => res.data),
  });
  refetch();

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const { Panel } = Collapse;

  return (
    <div style={{ margin: "10% 4%" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "3rem 0",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#545EE1",
          textTransform: "uppercase",
        }}
      >
        Frequently Asked Questions
      </h1>
      <Collapse accordion>
        {faqData?.data?.map((item: any) => (
          <Panel header={item.title} key={item.id}>
            <p style={{ paddingLeft: 24 }}>{item.description}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

const queryClient = new QueryClient();

const SeeAllTodayMealWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <FrequentlyAskQusPage />
  </QueryClientProvider>
);

export default SeeAllTodayMealWithQueryClient;
