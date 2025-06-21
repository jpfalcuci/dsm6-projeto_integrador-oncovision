import { Table, Flex } from '@chakra-ui/react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ResultBadge } from '../badge'
import { HistoryItem } from '@/models'

export const DashTable = ({ history }: { history?: HistoryItem[] }) => {
  return (
    <Table.Root overflow="auto">
      <Table.Header>
        <Table.Row bg="greyLight" h="2rem" fontSize="1rem" p="0.5rem">
          <Table.ColumnHeader textAlign="center" color="dark">
            ID
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Área Média
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Raio Médio
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Textura Média
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Perímetro Médio
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Suavidade Média
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Resultado
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" color="dark">
            Ações
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {history &&
          history?.map((item, index) => (
            <Table.Row key={index} bg="light" h="2.5rem" fontSize="1rem">
              <Table.Cell textAlign="center" color="dark">
                {index + 1}
              </Table.Cell>
              <Table.Cell textAlign="center" color="dark">
                {item.mean_area}
              </Table.Cell>
              <Table.Cell textAlign="center" color="dark">
                {item.mean_radius}
              </Table.Cell>
              <Table.Cell textAlign="center" color="dark">
                {item.mean_texture}
              </Table.Cell>
              <Table.Cell textAlign="center" color="dark">
                {item.mean_perimeter}
              </Table.Cell>
              <Table.Cell textAlign="center" color="dark">
                {item.mean_smoothness}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <ResultBadge result={item.prediction} />
              </Table.Cell>
              <Table.Cell textAlign="center" color="error">
                <Flex justifyContent="center" fontSize="1.15rem">
                  <RiDeleteBin6Line />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  )
}
