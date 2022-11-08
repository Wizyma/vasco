import { Box, Flex } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Sidebar } from "./components/Menu";
import { VericalTable } from "./components/Table";
import { useAnnualRevenue } from "./hooks/queries/useAnnualRevenue";
import { menus } from "./routes";

function App() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [year] = useState(2022)
  const { data, isLoading } = useAnnualRevenue(year);
  const menuSelection = useMemo(() => selectedPath?.split('.')?.[1], [selectedPath]);

  return (
    <Flex>
      <Sidebar items={menus} onClick={item => setSelectedPath(item)} />
      <div className="App">
        {menuSelection === 'yearly' ? <Box marginTop="6">
          {!isLoading  && data?.length ? <VericalTable 
            title="Targets"
            rows={data} 
            columns={[{
              name: 'month',
              label: '',
              customStyle: {
                backgroundColor: '#F7F7F8',
                height: '32px',
                paddingTop: '0px',
                paddingBottom: '0px',
              }
            }, {
              name: 'recurringRevenue',
              label: 'Recurring revenue',
              hasShadow: true,
              customStyle: {
                height: '42px',
                paddingTop: '0px',
                paddingBottom: '0px',
              }
            }, {
              name: 'churnRate',
              label: 'Churn Rate',
              format: (value) => `${value} %`,
              hasShadow: true,
              customStyle: {
                height: '42px',
                paddingTop: '0px',
                paddingBottom: '0px',
              }
            },
            {
              name: 'downgradeRate',
              label: 'Downgrade Rate',
              format: (value) => `${value} %`,
              hasShadow: true,
              customStyle: {
                height: '42px',
                paddingTop: '0px',
                paddingBottom: '0px',
              }
            },
            {
              name: 'upgradeRate',
              label: 'Updrade Rate',
              format: (value) => `${value} %`,
              hasShadow: true,
              customStyle: {
                height: '42px',
                paddingTop: '0px',
                paddingBottom: '0px',
              }
            }]} /> : null}
        </Box> : <h1>Hello World</h1>}
      </div>
    </Flex>
  );
}

export default App;
