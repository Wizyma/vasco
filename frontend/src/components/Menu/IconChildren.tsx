import { Box, Text } from "@chakra-ui/react";

export const SidebarIconChildren = ({ childrensNodes, childKey, selectedKey, onChildClick }: {
  selectedKey?: string, childKey: string, onChildClick: (id: string) => void; childrensNodes: {
    [key: string]: {
      label: string;
    }
  }
}) => {
  const child = childrensNodes![childKey];
  const isSelected = selectedKey === childKey

  return (
    <Box 
      backgroundColor={isSelected ? 'gray.50' : undefined} 
      fontWeight={isSelected ? 'bold' : 'normal'}
      _hover={{
        backgroundColor: !isSelected ? 'gray.100' : undefined
      }}
      _active={{
        fontWeight: 'bold'
      }}
      cursor="pointer"
      key={child.label} 
      onClick={() => onChildClick(childKey)} 
      display="flex" 
      alignItems="center"
      borderRadius="4" 
      minWidth={48}
      height="44px" >
      <Text fontSize="md" paddingLeft={3}>{child.label}</Text>
    </Box>
  )
}
