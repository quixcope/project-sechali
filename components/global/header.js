import React from "react";
import Image from "next/image";
import { Container, Anchor, Flex, Menu, ActionIcon } from "@mantine/core";
import Icons from "@/helpers/icon";

const cdnLoader = ({ src }) => {
  return `${process.env.SERVER_IP}/${src}`;
};

const Header = ({ setState }) => {
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 70,
  };

  return (
    <Container size="max-width" {...demoProps}>
      <Flex justify="space-around" align="center">
        <div style={{ marginTop: 10 }}>
          <Image
            style={{ cursor: "pointer" }}
            onClick={() =>
              setState((prev) => ({ ...prev, activePage: "home" }))
            }
            loader={cdnLoader}
            width={70}
            height={45}
            src="images/sechali.png"
            alt="logo"
          />
        </div>
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Anchor
            onClick={() =>
              setState((prev) => ({ ...prev, activePage: "aboutus" }))
            }
          >
            Hakkımızda
          </Anchor>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <div>
                <Anchor>Ürünler</Anchor>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Kadın</Menu.Item>
              <Menu.Item>Erkek</Menu.Item>
              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>
          <Anchor href="https://mantine.dev/" target="_blank">
            Anchor component
          </Anchor>
        </Flex>
        {/* <Anchor
          onClick={() => setState((prev) => ({ ...prev, activePage: "login" }))}
        >
          Kullanıcı Girişi
        </Anchor> */}
        <ActionIcon
          variant="subtle"
          style={{ cursor: "pointer" }}
          onClick={() => setState((prev) => ({ ...prev, activePage: "login" }))}
        >
          <Icons size={30} name="ImUser" />
        </ActionIcon>
      </Flex>
    </Container>
  );
};

export default Header;
