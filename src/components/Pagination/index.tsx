import { Box, Flex } from '@chakra-ui/react';

import { PageButton } from './PageButton';

export function Pagination() {
  return (
    <Flex
      direction={['column', 'row']}
      justify="space-between"
      align="center"
      gap="6"
      mt="8"
    >
      <Box whiteSpace="nowrap">
        <strong>1</strong> - <strong>10</strong> de 100
      </Box>

      <Flex gap="2" wrap="wrap">
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>4</PageButton>
        <PageButton>5</PageButton>

        <PageButton>5</PageButton>
        <PageButton>5</PageButton>
        <PageButton>5</PageButton>
        <PageButton>5</PageButton>
        <PageButton>5</PageButton>
        <PageButton>5</PageButton>
      </Flex>
    </Flex>
  );
}