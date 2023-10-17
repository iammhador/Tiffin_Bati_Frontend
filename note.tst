Color Code: 
BLUE   : #545EE1
ORANGE : #F76F01
WHITE  : #F5F4F9
BLACK  : #313416
PARAGRAPH : #445069


########################### HOME PAGE #####################################



----------------------------- October 15  -----------------------------------<<


<<== COMPLETED ==>>
# Register Page
# Photo System Add
# Login Page
# Dashboard Layout Page
# Private Route
# Super Admin => @1 Super admin can add new admin
                 @2 Super admin can Edit his information

<<== ON GOING  ==>>

              

<<== HAVE TO COMPLETE ==>>



----------------------------- October 16  -----------------------------------<<

<<== COMPLETED ==>>
# Logout Button Logic
# Admin Page => @1 Manage Profile

<<== ON GOING  ==>>
        

<<== HAVE TO COMPLETE ==>>


# Admin Page => 
                @6  Edit Feedback
                @8 Edit Subscription
                
# Have To  Fixed =>                
           @reset all form check
           @menu pagination and filter





----------------------------- October 17  -----------------------------------<<

<<== COMPLETED ==>>
@ Check email is valid or not.

<<== ON GOING  ==>>
        

<<== HAVE TO COMPLETE ==>>

@ Manage profile => Edit profile.
@ Menu search and pagination.
@ Subscription option.
@ Subscription history and status
@ Subscription cancel option.
@ Food review
@ Food review show




----------------------------- EXTRA CODE  -----------------------------------<<

==> Specific Router Added Code ===
import { useRouter } from "next/router";
import DashboardLayout from "../path/to/DashboardLayout";

const YourPageComponent = () => {
  const router = useRouter();
  const userLoggedIn = getFromLocalStorage("accessToken");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");
  const tokenDecode = decodedToken(userLoggedIn as string) as TokenData; // Use type assertion
  const { role } = tokenDecode;
  setUserRole(role);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      if (userRole === "user") {
        if (
          router.pathname.includes("/admin") ||
          router.pathname.includes("/super_admin")
        ) {
          router.push("/unauthorized"); // Redirect to an unauthorized page
        }
      } else if (userRole === "admin" || userRole === "super_admin") {
        if (!router.pathname.includes("/user")) {
          router.push("/unauthorized"); // Redirect to an unauthorized page
        }
      } else {
        router.push("/unauthorized"); // Redirect to an unauthorized page for unknown roles
      }
    }
    setLoading(true);
  }, [router, isLoading, userLoggedIn, userRole]);

  if (!isLoading) {
    return <Loading />;
  }

  return <DashboardLayout>{/* Your page content */}</DashboardLayout>;
};

export default YourPageComponent;
