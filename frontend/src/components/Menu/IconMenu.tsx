import { Flex} from "@chakra-ui/react";
import * as Icons from '@chakra-ui/icons';

import { IconsKeys } from ".";

export const SidebarIconsMenu = ({ icon, selectedKey, iconKey, onFirstLayerMenuClick }: 
    { icon: IconsKeys, selectedKey?: string, iconKey: string, onFirstLayerMenuClick: (id: string) => void }) => {
  const Icon = Icons[icon];
  const isSelected = selectedKey === iconKey

  return (
    <Flex 
      backgroundColor={isSelected ? 'brand.primary' : undefined} 
      onClick={() => onFirstLayerMenuClick(iconKey)}
      _hover={{
        backgroundColor: !isSelected ? 'gray.100' : undefined
      }}
      _active={{
        backgroundColor: !isSelected ? 'brand.primary' : undefined,
        color: 'white',
      }}
      color={isSelected ? "white" : "black"} 
      alignItems="center"
      justifyContent="center"
      borderRadius="4" 
      height="44px" 
      width="44px"
      cursor="pointer">
      {/*@ts-expect-error react element */}
      <Icon w={5} h={5} />
    </Flex>
  )
}
