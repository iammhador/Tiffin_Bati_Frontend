# TIFFIN BATI

Tiffin Bati is a website dedicated to providing solutions for individuals struggling with cooking as bachelors. The platform is designed to offer an easy way for bachelors to access daily food options and plan their meals effortlessly. With an intuitive interface and a range of features, Bachelor Food Service aims to simplify the process of meal planning for its users.

## Features

- **Today's Menu:** Users can view the available menu options for the current day.
- **Upcoming Menu:** Users can preview the upcoming menu so that they will know what we're introduce near future.
- **User Panel:** Registered users can access a dedicated dashboard with options to manage their profiles, provide feedback, view their subscription status, and access today's meal information.
- **Admin Panel:** Admins have the authority to manage the platform's content, including menus, FAQs, prices, plans, blogs, and user subscriptions. They can also manage user feedback and activate user subscriptions.
- **Super Admin Panel:** Super admins have additional privileges, such as managing admin accounts, including creating, deleting, and updating their information. They can also demote admins to users if necessary.

## Technologies Used

- Next.js
- TypeScript
- Tanstack/React-Query
- Axios
- Ant Design
- JWT (JSON Web Tokens)
- JWT-decode
- React-Loader-Spinner

## Default User Credentials

### Super Admin

- Username: super-admin
- Password: 123456789

### Admin

- Username: admin
- Password: 123456789

### User

- Username: user
- Password: 123456789

## Environmental Variables

Ensure to set up the following environmental variables:

- `NEXT_PUBLIC_IMGBB_API` - The URL for the imgBB API: `https://api.imgbb.com/1/upload?key=your_imgbb_api_key`
- `NEXT_PUBLIC_TIFFIN_BATI` - The URL for the Tiffin Bati backend API: `https://tiffin-bati.vercel.app/api/v1`

## Getting Started

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Start the development server using `npm run dev`.

### Usage

- Ensure you have the necessary environment variables set up.
- Make sure to configure the backend server accordingly for full functionality.

### Local Storage

User access tokens are stored securely in the local storage for seamless user experience.

## Contributing

Contributions are always welcome! Please adhere to the guidelines outlined in the `CONTRIBUTING.md` file.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

We would like to express our gratitude to all the contributors and supporters who have helped make this project possible.

## Contact

For any inquiries or support, please contact us at our [website](https://iammhador.netlify.app/).

## Videos

[![Tiffin Bati - Project Presentation](https://player.vimeo.com/video/876157558)](https://player.vimeo.com/video/876157558)


