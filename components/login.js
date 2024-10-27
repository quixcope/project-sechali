import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Grid,
  TextInput,
  Button,
  Card,
  Text,
  Anchor,
  Flex,
  CardSection,
} from "@mantine/core";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import RegisterForm from "./forms/registerform";

const cdnLoader = ({ src }) => {
  return `${process.env.SERVER_IP}/${src}`;
};

const Login = (props) => {
  const [state, setState] = useState({ activeButton: "login" });
  const { t } = useTranslation("common");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password1: "",
      password2: "",
    },
  });

  const handleSubmit = async (values) => {
    const response = await axios.post(
      `${process.env.SERVER_IP}/api/createCustomer`,
      { ...values, edit: state.edit }
    );
    if (response.data.success) {
      notifications.show({
        title: t("success"),
        color: "green",
        radius: "lg",
        // icon: <Icons name="FaRegCheckCircle" />,
        autoClose: 5000,
      });
    } else {
      notifications.show({
        title: t("error"),
        message: t(`${response.data.msg}`),
        color: "red",
        radius: "lg",
        // icon: <Icons name="FaExclamationTriangle" />,
      });
    }
  };

  useEffect(() => {
    console.log("mounted register");
    return () => {
      console.log("unmounted register");
    };
  }, []);

  return (
    <Card style={{ backgroundColor: "#f1cf2a" }} className="login-card">
      <Card.Section mb={150}>
        <Flex justify="center" align="center" gap={20}>
          <Button
            variant="subtle"
            onClick={() =>
              setState((prev) => ({ ...prev, activeButton: "login" }))
            }
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: state.activeButton === "login" ? "black" : "gray",
              }}
            >
              Giriş Yap
            </Text>
          </Button>
          |
          <Button
            variant="subtle"
            onClick={() =>
              setState((prev) => ({ ...prev, activeButton: "register" }))
            }
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: state.activeButton === "register" ? "black" : "gray",
              }}
            >
              Kayıt Ol
            </Text>
          </Button>
        </Flex>
      </Card.Section>
      <CardSection>
        <Grid>
          {state.activeButton === "login" ? (
            <>
              <Grid.Col>
                <TextInput
                  placeholder={t("E-mail")}
                  withAsterisk
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col>
                <PasswordInput
                  style={{ borderColor: "#393939" }}
                  withAsterisk
                  placeholder={t("Şifre")}
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
            </>
          ) : (
            <RegisterForm />
          )}
        </Grid>
      </CardSection>
    </Card>
  );
};

export default Login;
