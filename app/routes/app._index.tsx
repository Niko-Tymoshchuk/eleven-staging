import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Card,
  Divider,
  Grid,
  Icon,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { PersonSegmentIcon, PersonFilledIcon } from "@shopify/polaris-icons";
import { getAnalytics } from "~/services/subscriptionService.server";
import { authenticate } from "~/shopify.server";

import { Chart } from "react-google-charts";
import { useCallback, useEffect, useState } from "react";
import { AnimatedChart } from "~/components/AnimatedChart";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    await authenticate.admin(request);

    const analytics = await getAnalytics();

    if (analytics) {
      return json({
        status: 200,
        analytics,
        error: null,
      });
    }
  } catch (error) {
    return json({
      status: 500,
      error: `${error}`,
      analytics: null,
    });
  }
};

const COLORS = [
  "#5C6AC4",
  "#ccedc3",
  "#eba416",
  "#9ba6b1",
  "#006FBB",
  "#e5ed9b",
  "#2A2A2A",
  "#b6acdf",
  "#008060",
  "#FFF7ED",
  "#595959",
  "#e68bb1",
  "#c18f69",
  "#4daaec",
  "#2b4a50",
];

type AnalyticChartType = (
  | [string, string, Record<string, string>]
  | [string, number]
)[];

export default function HomePage() {
  const { analytics } = useLoaderData<typeof loader>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDataByStatsKey = useCallback(
    (key: "lifePath" | "expression" | "soul" | "personal") => {
      const formattedArray =
        analytics?.stats[key].map(({ count, field }, index) => {
          return [`Number ${field}`, count, COLORS[index]];
        }) ?? [];

      (formattedArray as AnalyticChartType).unshift([
        "Value",
        "Count",
        { role: "style" },
      ]);

      return formattedArray;
    },
    [analytics?.stats],
  );

  return (
    <>
      {isMounted && (
        <Page title="Dashboard">
          <Box paddingBlockEnd="800">
            <BlockStack gap="600">
              <Divider borderWidth="050" />
              <Card padding="1000">
                {analytics && (
                  <BlockStack gap="800">
                    <Grid
                      columns={{
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 2,
                      }}
                      gap={{
                        xs: "20px",
                        sm: "20px",
                        md: "40px",
                        lg: "60px",
                        xl: "60px",
                      }}
                    >
                      <BlockStack gap={"600"}>
                        <InlineStack align="space-between">
                          <InlineStack blockAlign="center" gap="150">
                            <Icon source={PersonSegmentIcon} />
                            <Text as="p" variant="headingMd">
                              Total subscribers
                            </Text>
                          </InlineStack>

                          <Text as="p" variant="headingMd">
                            {analytics.totalSubscribers}
                          </Text>
                        </InlineStack>
                        <Box>
                          <InlineStack align="space-between">
                            <InlineStack blockAlign="center" gap="150">
                              <Icon source={PersonFilledIcon} />
                              <Text as="p" variant="headingMd">
                                Average subscriber age
                              </Text>
                            </InlineStack>
                            <Text as="p" variant="headingMd">
                              {analytics.averageAge}
                            </Text>
                          </InlineStack>
                          <AnimatedChart />
                        </Box>
                      </BlockStack>
                      <Box
                        padding="300"
                        borderColor="border-emphasis"
                        borderWidth="0165"
                        borderRadius="500"
                      >
                        <Chart
                          width={"100%"}
                          height={300}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["Age", "Count"],
                            ...Object.entries(analytics.ageGroups),
                          ]}
                          options={{
                            title: "Customers age groups",
                            colors: COLORS,
                          }}
                        />
                      </Box>
                    </Grid>
                    <BlockStack gap="800">
                      <Box
                        padding="400"
                        borderColor="border-emphasis"
                        borderWidth="0165"
                        borderRadius="500"
                      >
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={getDataByStatsKey("lifePath")}
                          options={{
                            title: "Life Path number stats",
                          }}
                        />
                      </Box>
                      <Box
                        padding="400"
                        borderColor="border-emphasis"
                        borderWidth="0165"
                        borderRadius="500"
                      >
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={getDataByStatsKey("expression")}
                          options={{
                            title: "Expression number stats",
                          }}
                        />
                      </Box>
                      <Box
                        padding="400"
                        borderColor="border-emphasis"
                        borderWidth="0165"
                        borderRadius="500"
                      >
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={getDataByStatsKey("soul")}
                          options={{
                            title: "Soul number stats",
                          }}
                        />
                      </Box>
                      <Box
                        padding="400"
                        borderColor="border-emphasis"
                        borderWidth="0165"
                        borderRadius="500"
                      >
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={getDataByStatsKey("personal")}
                          options={{
                            title: "Personal number stats",
                          }}
                        />
                      </Box>
                    </BlockStack>
                  </BlockStack>
                )}
              </Card>
            </BlockStack>
          </Box>
        </Page>
      )}
    </>
  );
}
