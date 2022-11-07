import { Divider, HStack, Stack, Text, Collapse, useDisclosure, Box, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Icons from '@chakra-ui/icons';

import vascoLogo from "../../assets/vasco.svg";
import { SidebarIconsMenu } from "./IconMenu";
import { SidebarIconChildren } from "./IconChildren";

export type IconsKeys = keyof typeof Icons;
export type MenuProps = {
  items: {
    [key: string]: {
      icon: IconsKeys;
      placeholder?: string;
      title: string;
      children: {
        [key: string]: {
          label: string;
        }
      }
    }
  }
  onClick: (props: string | null) => void;
};

export const Sidebar = ({ items, onClick }: MenuProps) => {
  const [selectedPath, setSelectedPath] = useState<null | string>(null);
  const { isOpen, onToggle, onOpen } = useDisclosure({
    defaultIsOpen: true,
  })


  const onFirstLayerMenuClick = useCallback((key: string) => {
    const currentSelection = selectedPath?.split('.')?.[0];

    if(currentSelection !== key) {
      const childrens = Object.keys(items[key].children);
      const nextChildren = childrens[0];
      const next = `${key}.${nextChildren}`
      onClick(next)
      setSelectedPath(next);
      onOpen();
    }
  }, [items, selectedPath])

  const onChildClick = useCallback((key: string) => {
    const currentSelection = selectedPath?.split('.');

    if(currentSelection?.[1] !== key) {
      const next = `${currentSelection![0]}.${key}`
      onClick(next)
      setSelectedPath(next);
    }
  }, [selectedPath])

  useEffect(() => {
    const keys = Object.keys(items)
    const nextKey = keys[0];
    const childrens = Object.keys(items[nextKey].children);
    const nextChildren = childrens[0];
    const next = `${nextKey}.${nextChildren}`;
    onClick(next)
    setSelectedPath(next);

    return () => {
      onClick(null)
    }
  }, [])

  const childrensNodes = useMemo(() => {
    const [first, second] = selectedPath?.split('.') ?? []
    if(first && second) {
      return items[first].children;
    }

    return null;
  }, [selectedPath]);
  const selectedKeys = useMemo(() => selectedPath?.split('.'), [selectedPath]);

  return (
    <HStack spacing={2} minHeight="100vh" p="2" display="flex" alignItems="start">
      <Stack spacing={4} width="14" flexDirection="column" alignItems="center">
        <img width={36} src={vascoLogo} className="logo vasco" alt="Vasco logo" />
        {Object.keys(items).map(key => 
          <SidebarIconsMenu 
          key={key}
          iconKey={key}
          selectedKey={selectedKeys?.[0]}
          onFirstLayerMenuClick={onFirstLayerMenuClick}
          icon={items[key].icon} />
        )}
      </Stack>
      <Divider orientation='vertical' />
      <Stack spacing={2} flexDirection="column">
        <Box display="flex" alignItems="baseline" justifyContent="space-between">
          {selectedKeys?.length && isOpen ? <Text paddingLeft={3} fontWeight="bold" fontSize="xl">{items[selectedKeys[0]].title}</Text> : null}
          <Flex
            _hover={{
              backgroundColor: "gray.100"
            }}
            backgroundColor="gray.50"
            onClick={onToggle}
            alignItems="center"
            justifyContent="center"
            borderRadius="4" 
            height="44px" 
            width="44px"
            cursor="pointer">
            {isOpen ? <Icons.ArrowLeftIcon w={4} h={4} /> : <Icons.ArrowRightIcon w={4} h={4} />}
          </Flex>
        </Box>
        <Collapse in={isOpen} animateOpacity>
        <Stack spacing={2} flexDirection="column">
          {Object.keys(childrensNodes ?? {}).length ? 
            Object.keys(childrensNodes!).map(childKey => <SidebarIconChildren 
              key={childKey} 
              childKey={childKey}
              childrensNodes={childrensNodes!}
              selectedKey={selectedKeys?.[1]} 
              onChildClick={onChildClick}  />) : null}
        </Stack>
        </Collapse>
      </Stack>
      <Divider orientation='vertical' />
    </HStack>
  )
}