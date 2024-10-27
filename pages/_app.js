import "../styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "mantine-datatable/styles.css";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, createTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import Icons from "../helpers/icon";
import useTranslation from "next-translate/useTranslation";

const MyApp = ({ Component, pageProps }) => {
  const { t } = useTranslation("common");
  const [connection, setConnection] = useState(true);

  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    // primaryColor: "gray",
  });

  const offline = () => {
    setConnection(navigator.onLine);
    !navigator.onLine &&
      notifications.show({
        title: t("checkyourconnection"),
        color: "blue",
        icon: <Icons name="MdSignalWifiStatusbarConnectedNoInternet2" />,
        autoClose: false,
        withCloseButton: false,
      });
  };

  useEffect(() => {
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("offline", offline);
    };
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Notifications position={connection ? "bottom-right" : "top-center"} />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp;
