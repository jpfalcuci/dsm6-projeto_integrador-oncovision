'use client'

import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { Box, Button, Field, Flex, Heading, Input } from '@chakra-ui/react'
import { PredictDataState } from '@/models'
import { predict } from '@/redux/reducer/predict'

export const PredictionForm = () => {
  const [predictData, setPredictData] = useState<PredictDataState>({
    mean_area: '',
    mean_radius: '',
    mean_texture: '',
    mean_perimeter: '',
    mean_smoothness: '',
  })

  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPredictData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const numericData = {
        mean_area: parseFloat(predictData.mean_area) || 0,
        mean_radius: parseFloat(predictData.mean_radius) || 0,
        mean_texture: parseFloat(predictData.mean_texture) || 0,
        mean_perimeter: parseFloat(predictData.mean_perimeter) || 0,
        mean_smoothness: parseFloat(predictData.mean_smoothness) || 0,
      }
      dispatch(predict(numericData))

      setPredictData({
        mean_area: '',
        mean_radius: '',
        mean_texture: '',
        mean_perimeter: '',
        mean_smoothness: '',
      })
    },
    [dispatch, predictData]
  )

  return (
    <Box
      mt="2rem"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      borderBottomLeftRadius="0.5rem"
      borderBottomRightRadius="0.5rem"
      onSubmit={handleSubmit}
    >
      <Box
        w="full"
        bgColor="greyLight"
        p="1rem"
        borderTopLeftRadius="0.5rem"
        borderTopRightRadius="0.5rem"
      >
        <Heading as="h4" color="dark" fontWeight={700} textAlign="start">
          Inserir dados do exame
        </Heading>
      </Box>
      <Box
        w="full"
        as="form"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="2rem"
        p="1rem"
      >
        <Box w="full">
          <Heading as="h4" color="neutral" fontWeight={600} textAlign="start">
            Características Médias
          </Heading>
        </Box>

        <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap="2rem"
          mt="1rem"
        >
          <Box w="20rem">
            <Field.Root required>
              <Field.Label color="dark" fontSize="1rem">
                Área Média <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Área Média"
                type="number"
                borderColor="input"
                color="secondary"
                pl="0.5rem"
                name="mean_area"
                value={predictData.mean_area}
                onChange={(e) => handleInputChange(e)}
              />
              <Field.HelperText></Field.HelperText>
            </Field.Root>
          </Box>

          <Box w="20rem">
            <Field.Root required>
              <Field.Label color="dark" fontSize="1rem">
                Raio Médio <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Raio Médio"
                type="number"
                borderColor="input"
                color="secondary"
                pl="0.5rem"
                name="mean_radius"
                value={predictData.mean_radius}
                onChange={(e) => handleInputChange(e)}
              />
              <Field.HelperText></Field.HelperText>
            </Field.Root>
          </Box>

          <Box w="20rem">
            <Field.Root required>
              <Field.Label color="dark" fontSize="1rem">
                Textura Média <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Textura Média"
                type="number"
                borderColor="input"
                color="secondary"
                pl="0.5rem"
                name="mean_texture"
                value={predictData.mean_texture}
                onChange={(e) => handleInputChange(e)}
              />
              <Field.HelperText></Field.HelperText>
            </Field.Root>
          </Box>

          <Box w="20rem">
            <Field.Root required>
              <Field.Label color="dark" fontSize="1rem">
                Perímetro Médio <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Perímetro Médio"
                type="number"
                borderColor="input"
                color="secondary"
                pl="0.5rem"
                name="mean_perimeter"
                value={predictData.mean_perimeter}
                onChange={(e) => handleInputChange(e)}
              />
              <Field.HelperText></Field.HelperText>
            </Field.Root>
          </Box>

          <Box w="20rem">
            <Field.Root required>
              <Field.Label color="dark" fontSize="1rem">
                Suavidade Média <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="Suavidade Média"
                type="number"
                borderColor="input"
                color="secondary"
                pl="0.5rem"
                name="mean_smoothness"
                value={predictData.mean_smoothness}
                onChange={(e) => handleInputChange(e)}
              />
              <Field.HelperText></Field.HelperText>
            </Field.Root>
          </Box>
        </Flex>

        <Button
          w="12rem"
          p="1rem 4rem"
          bg="neutral"
          color="light"
          type="submit"
          mb="1rem"
          _hover={{ bgColor: 'neutralDark' }}
        >
          Analisar
        </Button>
      </Box>
    </Box>
  )
}
