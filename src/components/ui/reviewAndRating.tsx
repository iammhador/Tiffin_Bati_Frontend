// import Loading from "@/app/loading";
// import { useQuery } from "@tanstack/react-query";
// import { message } from "antd";
// import axios from "axios";
// import dayjs from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// dayjs.extend(advancedFormat);
// import { StarFilled } from "@ant-design/icons";

// type ReviewAndRatingPageProps = {
//   id?: string;
// };

// const ReviewAndRatingPage = ({ id }: ReviewAndRatingPageProps) => {
//   const { isLoading, error, data, refetch } = useQuery({
//     queryKey: ["reviewData"],

//     queryFn: () =>
//       axios
//         .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/review-and-rating/${id}`)
//         .then((res) => res.data),
//   });
//   refetch();
//   if (isLoading) return <Loading />;
//   if (error) return message.error("An error has occurred: " + error);

//   return (
//     <div>
//       {data?.data?.map((item: any) => {
//         const formattedDate = dayjs(item?.updatedAt).format(
//           "hh:mm:ss A, MMMM D"
//         );

//         const ratingIcons = [];
//         for (let i = 0; i < Math.floor(item.rating); i++) {
//           ratingIcons.push(<StarFilled key={i} style={{ color: "gold" }} />);
//         }
//         return (
//           <div
//             key={item?.id}
//             style={{
//               width: "100%",
//               margin: "1% 0",
//               borderRadius: "8px",
//               overflow: "hidden",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <p style={{ padding: "1% 2%", borderBottom: "1px solid #f0f0f0" }}>
//               {ratingIcons}
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignSelf: "center",
//                 border: "1px solid #f0f0f0",
//                 width: "100vh",
//                 padding: "2% 3%",
//               }}
//             >
//               <p>{item?.review}</p>
//               <p
//                 style={{
//                   padding: "0% 5%",
//                 }}
//               >
//                 {formattedDate}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ReviewAndRatingPage;

import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import { StarFilled } from "@ant-design/icons";

type ReviewAndRatingPageProps = {
  id?: string;
};

const ReviewAndRatingPage = ({ id }: ReviewAndRatingPageProps) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviewData"],

    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_TIFFIN_BATI}/review-and-rating/${id}`)
        .then((res) => res.data),
  });
  refetch();
  if (isLoading) return <Loading />;
  if (error) return message.error("An error has occurred: " + error);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data?.data?.map((item: any) => {
        const formattedDate = dayjs(item?.updatedAt).format(
          "hh:mm:ss A, MMMM D"
        );

        const ratingIcons = [];
        for (let i = 0; i < Math.floor(item.rating); i++) {
          ratingIcons.push(<StarFilled key={i} style={{ color: "gold" }} />);
        }
        return (
          <div
            key={item?.id}
            style={{
              width: "85vw",
              margin: "1% 0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ padding: "1% 2%", borderBottom: "1px solid #f0f0f0" }}>
              {ratingIcons}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #f0f0f0",
                padding: "2% 3%",
              }}
            >
              <p>{item?.review}</p>
              <p style={{ padding: "1% 0" }}>{formattedDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndRatingPage;
