import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import NextLink from "next/link";
import React from "react";
import {sassClasses} from "@utils";
import styles from "./LinksTab.module.scss";
import {SearchGroup} from "./SearchGroup";

const cl = sassClasses(styles);

type LinkDetails = {
  id: string;
  url: string;
  image_url: string;
  title: string;
  description: string;
};

const data = [
  {
    title: "June",
    links: [
      {
        id: "1",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "2",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "3",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "4",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
    ],
  },
  {
    title: "May",
    links: [
      {
        id: "1",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "2",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "3",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
      {
        id: "4",
        url: "https://chakra-ui.com/docs/components/button/usage",
        image_url: "https://chakra-ui.com/twitter-og-image.png",
        title: "Button",
        description:
          "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation. ",
      },
    ],
  },
];

type LinkItemProps = {
  link: LinkDetails;
};

const LinkItem: React.FC<LinkItemProps> = ({link}) => {
  return (
    <NextLink href={link.url} passHref>
      <div className={cl("LinkItem")}>
        <div className={cl("icon")} />
        <div className={cl("details")}>
          <div className={cl("title")}>{link.title}</div>
          <div className={cl("description")}>{link.description}</div>
          <a className={cl("url")}>{link.url}</a>
        </div>
      </div>
    </NextLink>
  );
};

export const LinksTab = () => {
  const checkIsLastGroup = (index: number) => index == data.length - 1;

  return (
    <VerticalScrollableView>
      <div className={cl("LinksTab")}>
        {data.map((group, index) => (
          <SearchGroup
            key={group.title}
            title={group.title}
            isLastGroup={checkIsLastGroup(index)}
          >
            {group.links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </SearchGroup>
        ))}
      </div>
    </VerticalScrollableView>
  );
};
