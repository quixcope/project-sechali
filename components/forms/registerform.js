import React from "react";
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
import { useForm } from "@mantine/form";
import useTranslation from "next-translate/useTranslation";
import { notifications } from "@mantine/notifications";
import Icons from "@/helpers/icon";
import axios from "axios";

const RegisterForm = () => {
  const { t } = useTranslation("common");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password1: "",
      password2: "",
    },
  });

  const handleSubmit = async () => {
    const response = await axios.post(`${process.env.SERVER_IP}/api/register`);
    if (response.data.success) {
      notifications.show({
        title: t("success"),
        color: "green",
        radius: "lg",
        icon: <Icons name="FaRegCheckCircle" />,
        autoClose: 5000,
      });
    } else {
      notifications.show({
        title: t("error"),
        message: t(`${response.data.msg}`),
        color: "red",
        radius: "lg",
        icon: <Icons name="FaExclamationTriangle" />,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid>
        <Grid.Col>
          <TextInput
            placeholder={t("Adınız")}
            withAsterisk
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col>
          <TextInput
            style={{ borderColor: "#393939" }}
            withAsterisk
            placeholder={t("E-mail")}
            {...form.getInputProps("email")}
          />
        </Grid.Col>
        <Grid.Col>
          <PasswordInput
            placeholder={t("Şifreniz")}
            withAsterisk
            {...form.getInputProps("password1")}
          />
        </Grid.Col>
        <Grid.Col>
          <PasswordInput
            style={{ borderColor: "#393939" }}
            withAsterisk
            placeholder={t("Şifreniz tekrar")}
            {...form.getInputProps("password2")}
          />
        </Grid.Col>
        <Grid.Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button style={{ background: "black", width: "100%" }} type="submit">
            Kayıt Ol
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default RegisterForm;
