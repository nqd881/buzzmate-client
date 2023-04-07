import {As, ComponentWithAs} from "@chakra-ui/react";

export type GetChakraProps<
  C extends As,
  P extends object = {}
> = ComponentWithAs<C, P> extends (props: infer X) => any ? X : never;
