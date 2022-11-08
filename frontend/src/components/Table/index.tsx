import {
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  StyleProps,
} from '@chakra-ui/react'
import { identity } from 'ramda';
import { useEffect, useMemo, useState } from 'react';

export type TableProps<T = unknown> = {
  title: string;
  rows: T[];
  columns: {
    name: keyof T;
    isEditable?: boolean;
    label: string;
    hasShadow?: boolean;
    customStyle?: StyleProps
    format?: (value: any) => string
  }[]
}

export const VericalTable = <T,>({ rows, columns, title }: TableProps<T>) => {
  const savedColumns = useMemo(() => columns, [columns]);
  const [elementSize, setElementSize] = useState(window.innerWidth / 1.3)
  const groups = useMemo(() => savedColumns.map(column => ({
    ...column,
    items: rows.map(row => row[column.name])
  })), [savedColumns, rows])

  const onResize = () => {
    setElementSize(window.innerWidth / 1.3);
  }
  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Box id="vertical-table" margin="auto" overflow="hidden" width={`${elementSize}px`} position="relative" border="1px solid #EEEFF2">
      <Box width="100%" borderBottom="1px solid #EEEFF2">
        <Text fontSize="2xl" fontWeight="bold" p="2" ml="2.5">{title}</Text>
      </Box>
      <TableContainer width="100%" overflow="auto">
        <Table marginBottom="0.25rem" variant="simple" overflowX="auto" overflowY="visible" style={{ tableLayout: 'fixed', width: '100%' }}>
          {groups.map(({ format = identity,...column }, index) => (
            <Tr key={column.name as string}>
              <>
                <Th 
                  width="200px" 
                  position="absolute"
                  border="none"
                  display="flex"
                  alignItems="center"
                  backgroundColor="white"
                  height="55px"
                  boxShadow={column.hasShadow ? "6px 0 10px -3px #EEEFF2" : undefined}
                  {...column?.customStyle}>
                  {column.label}
                </Th>
                <Td width="200px" />
                {column.items.map(item => (
                  <Td 
                    textAlign="end" 
                    fontWeight="medium" 
                    borderBottom={groups.length === (index + 1) ? 'none' : '1px solid #EEEFF2'} 
                    width="200px" key={`${column.name as string}-${item}`}
                    {...column?.customStyle}>
                      {format(item)}
                    </Td>
                ))}
              </>
            </Tr>
          ))}
        </Table>
      </TableContainer>
    </Box>
  )
};