// import { Input, Stack } from "@mantine/core";
import MainCard from "components/MainCard";
import { Grid } from "@mui/material";
import {
  Text,
  Tabs,
  Input,
  Stack,
  Box,
  Flex,
  Tooltip,
  Select,
  Button,
  PasswordInput,
} from "@mantine/core";

import {
  IconCheck,
  IconEqualNot,
  IconLock,
  IconSettingsPlus,
  IconUserEdit,
} from "@tabler/icons-react";
import { IconAlertCircle } from "@tabler/icons-react";
import { useGetCities, useGetTowns } from "api/hooks/common-hook";
import { roles } from "constants/roles";
import { useFormik } from "formik";
import { useCreateUser } from "api/hooks/user-hook";
import { useDisclosure } from "@mantine/hooks";


export function AddTeacher() {
  const [visible, { toggle }] = useDisclosure(false);

  const { data: towns } = useGetTowns();
  const { data: cities } = useGetCities();

  const myCities = cities?.data?.cities?.map((city) => {
    city.value = city?.id;
    city.label = city?.name;
    return city;
  });

  const myTowns = towns?.data?.towns?.map((town) => {
    town.value = town?.id;
    town.label = town?.name;
    return town;
  });

  const createUserMutation = useCreateUser();

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      password: "",
      confirm_password: "",
      last_name: "",
      birthday: "",
      city_id: 1,
      town_id: 1,
      address: "",
      email: "",
      phone_number: "",
      active: "1",
      role_id: "4",
      image_id: null
    },
    onSubmit: async (values) => {
      const { active, role_id, confirm_password, ...others } = values;
      await createUserMutation.mutateAsync({
        active: active === "1",
        role_id: parseInt(role_id),
        ...others,
      });
    },
  });

  const onAllUploaded = (images)=>{
    const id = images[0]?.id;
    formik.values.image_id = id;
  }

  const setIsUploading = ()=>{

  }

  const isUploading = ()=>{

  }

  return (
    <Tabs color="green" variant="outline" defaultValue="User Info">
      <Tabs.List position="center">
        <Tabs.Tab value="User Info" icon={<IconUserEdit size="0.8rem" />}>
          Teacher Info
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="User Info" pt="xs">
        <Grid container rowSpacing={4.5} columnSpacing={2.75} mt={2}>
          <Grid item xs={12} md={7} lg={8}>
            <Stack spacing={2}>
              {/* @ts-ignore */}
              <MainCard>
                <Text pb={2}>User Info</Text>
                <Stack spacing={20}>
                  <Input.Wrapper label="User">
                    <Box pt="10px">
                      <Input
                        placeholder="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        rightSection={
                          <Tooltip
                            label="This must be unique"
                            position="top-end"
                            withArrow
                          >
                            <div>
                              <IconAlertCircle
                                size="1rem"
                                style={{ display: "block", opacity: 0.5 }}
                              />
                            </div>
                          </Tooltip>
                        }
                      />
                    </Box>
                  </Input.Wrapper>

                  <Flex gap={20}>
                    <Input.Wrapper label="first name" sx={{ flex: 1 }}>
                      <Input
                        placeholder="first name"
                        name="first_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.first_name && formik.touched.first_name
                        }
                      />

                      {formik.errors.first_name &&
                        formik.touched.first_name && (
                          <Input.Error>{formik.errors.first_name}</Input.Error>
                        )}
                    </Input.Wrapper>

                    <Input.Wrapper label="last name" sx={{ flex: 1 }}>
                      <Input
                        placeholder="last name"
                        name="last_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.last_name && formik.touched.last_name
                        }
                      />

                      {formik.errors.last_name && formik.touched.last_name && (
                        <Input.Error>{formik.errors.last_name}</Input.Error>
                      )}
                    </Input.Wrapper>
                  </Flex>

                  <Flex gap={20}>
                    <Input.Wrapper label="user bird day" sx={{ flex: 1 }}>
                      <Input
                        placeholder="first name"
                        name="birthday"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.birthday}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.birthday && formik.touched.birthday
                        }
                      />

                      {formik.errors.birthday && formik.touched.birthday && (
                        <Input.Error>{formik.errors.birthday}</Input.Error>
                      )}
                    </Input.Wrapper>
                    <Box sx={{ flex: 1 }} />
                  </Flex>
                  <Flex gap={20}>
                    <Input.Wrapper label="Password" sx={{ flex: 1 }}>
                      <PasswordInput
                        defaultValue="secret"
                        name="password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.password && formik.touched.password
                        }
                        icon={<IconLock size="1rem" />}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper label="Confirm password" sx={{ flex: 1 }}>
                      <PasswordInput
                        defaultValue="secret"
                        name="confirm_password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        onChange={formik.handleChange}
                        value={formik.values.confirm_password}
                        onBlur={formik.handleBlur}
                        error={
                          formik.values.password !==
                            formik.values.confirm_password &&
                          formik.touched.confirm_password &&
                          formik.touched.password
                        }
                        icon={
                          formik.values.password !==
                            formik.values.confirm_password &&
                          formik.touched.confirm_password &&
                          formik.touched.password ? (
                            <IconEqualNot size="1rem" />
                          ) : (
                            <IconCheck size="1rem" />
                          )
                        }
                        sx={{ borderColor: "green" }}
                      />
                    </Input.Wrapper>
                  </Flex>
                </Stack>
              </MainCard>

              {/* @ts-ignore */}
              <MainCard>
                <Text pb={2}>User Contact</Text>

                <Stack spacing={20}>
                  <Flex gap={20}>
                    <Input.Wrapper label="Phone number" sx={{ flex: 1 }}>
                      <Input
                        placeholder="0555..."
                        name="phone_number"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone_number}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.phone_number &&
                          formik.touched.phone_number
                        }
                      />

                      {formik.errors.phone_number &&
                        formik.touched.phone_number && (
                          <Input.Error>
                            {formik.errors.phone_number}
                          </Input.Error>
                        )}
                    </Input.Wrapper>

                    <Input.Wrapper label="Address email" sx={{ flex: 1 }}>
                      <Input
                        placeholder="user@email..."
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email && formik.touched.email}
                      />

                      {formik.errors.email && formik.touched.email && (
                        <Input.Error>{formik.errors.email}</Input.Error>
                      )}
                    </Input.Wrapper>
                  </Flex>
                </Stack>
              </MainCard>

              {/* @ts-ignore */}
              <MainCard>
                <Text pb={2}>User Adress</Text>

                <Stack spacing={20}>
                  <Flex gap={20}>
                    <Input.Wrapper label="City" sx={{ flex: 1 }}>
                      <Select
                        searchable
                        clearable
                        // limit={1}
                        placeholder="Jijel"
                        name="city"
                        data={myCities || []}
                        onChange={(value) =>
                          formik.setFieldValue("city_id", value)
                        }
                        // onItemSubmit={formik.handleChange}
                        // value={formik.values.city || ""}
                        nothingFound="No options"
                        // onBlur={formik.handleBlur}
                        // error={formik.errors.city && formik.touched.city}
                      />

                      {/* {formik.errors.price && formik.touched.price && (
                              <Input.Error>{formik.errors.price}</Input.Error>
                            )} */}
                    </Input.Wrapper>

                    <Input.Wrapper label="Town" sx={{ flex: 1 }}>
                      <Select
                        limit={10}
                        placeholder="jijel"
                        name="town"
                        onChange={(value) =>
                          formik.setFieldValue("town_id", value)
                        }
                        searchable
                        clearable
                        data={myTowns || []}
                        nothingFound="No options"
                        onBlur={formik.handleBlur}
                        error={formik.errors.town_id && formik.touched.town_id}
                      />

                      {formik.errors.town_id && formik.touched.town_id && (
                        <Input.Error>{formik.errors.town_id}</Input.Error>
                      )}
                    </Input.Wrapper>
                  </Flex>
                  <Input.Wrapper label="Adress">
                    <Input
                      placeholder="05 alger center"
                      name="address"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                      error={formik.errors.address && formik.touched.address}
                    />

                    {formik.errors.address && formik.touched.address && (
                      <Input.Error>{formik.errors.address}</Input.Error>
                    )}
                  </Input.Wrapper>
                </Stack>
              </MainCard>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={2}>
              {/* @ts-ignore */}
              <MainCard>
                <Text pb={2}>Status</Text>
                <Stack spacing={20}>
                  <Input.Wrapper label="">
                    <Select
                      // label="Avtive"
                      pt={10}
                      placeholder="Pick one"
                      defaultValue={formik.values.active}
                      onChange={(e) => formik.setFieldValue("active", e)}
                      data={[
                        { value: "1", label: "Active" },
                        { value: "0", label: "Not active" },
                      ]}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="User role">
                    <Select
                      disabled
                      // label="Avtive"
                      pt={10}
                      placeholder="Pick one"
                      onChange={(value) =>
                        formik.setFieldValue("role_id", value)
                      }
                      defaultValue={formik.values.role_id}
                      data={roles}
                    />
                  </Input.Wrapper>
                </Stack>
              </MainCard>

              {/* @ts-ignore */}
              <MainCard>
                <Text pb={2}>Save User</Text>

                <Button
                  variant="light"
                  fullWidth
                  mt={20}
                  loading={formik.isSubmitting}
                  onClick={formik.submitForm}
                >
                  Submit
                </Button>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </Tabs.Panel>

      {/*<Tabs.Panel value="Permisions" pt="xs">*/}
      {/*</Tabs>  Messages tab content*/}
      {/*</Tabs.Panel>*/}
    </Tabs>
  );
}

export default AddTeacher;