import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">Admin</Typography.Link>
      <Typography.Link href="localhost:3000" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms of Use
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
