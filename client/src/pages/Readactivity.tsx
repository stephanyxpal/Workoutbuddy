import { useQuery, useMutation } from "@apollo/client";
import { Spinner, Text, Box, Center } from "@chakra-ui/react";
import { Input, Button, IconButton, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Tfoot,
} from "@chakra-ui/table";
import { Workouts } from "../utils/queries";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { DELETE_WORKOUT, UPDATE_WORKOUT } from "../utils/mutation";

const ReadActivities = () => {
  const { loading, error, data, refetch } = useQuery(Workouts);

  const [deleteWorkout] = useMutation(DELETE_WORKOUT, {
    onCompleted: () => refetch(), // Refresh the data after deletion
  });

  const [updateWorkout] = useMutation(UPDATE_WORKOUT, {
    onCompleted: () => refetch(), // Refresh the data after update
  });

  const [editing, setEditing] = useState<string | null>(null);
  const [updatedData, setUpdatedData] = useState<{
    duration: number;
    caloriesBurned: number;
  }>({
    duration: 0,
    caloriesBurned: 0,
  });

  if (loading)
    return (
      <Center>
        <Spinner size='xl' />
      </Center>
    );
  if (error) return <Text color='red.500'>Error fetching data</Text>;
  console.log(data);
  const activities = data?.workouts || []; // Ensure workouts array exists
  console.log(activities);

  // Delete function
  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteWorkout({ variables: { deleteWorkoutId: id } });
  };

  const handleEdit = (activity: any) => {
    console.log(activity.id);
    setEditing(activity.id);
    setUpdatedData({
      duration: activity.duration,
      caloriesBurned: activity.caloriesBurned,
    });
  };

  // Update function
  const handleUpdate = async (id: string) => {
    console.log("trying to update");
    await updateWorkout({
      variables: {
        updateWorkoutId: id, // Correct ID variable name
        input: {
          // date: new Date().toISOString(), // Set the current date, or use the original activity's date
          // workoutType: activity.workoutType, // You need to have a valid value for workoutType
          duration: updatedData.duration,
          caloriesBurned: updatedData.caloriesBurned,
        },
      },
    });
    setEditing(null);
  };
  return (
    <Box maxW='800px' mx='auto' mt={6} p={4} boxShadow='md' borderRadius='lg'>
      <Text fontSize='2xl' fontWeight='bold' mb={4} textAlign='center'>
        Your Workout Activities
      </Text>

      {activities.length === 0 ? (
        <Text textAlign='center' color='gray.500'>
          No activities found.
        </Text>
      ) : (
        <TableContainer>
          <Table
            variant='striped'
            colorScheme='blue'
            size='lg'
            borderWidth='1px'
            display='block'
          >
            <Thead bg='blue.600'>
              <Tr>
                <Th color='Black' px={10} py={4} fontSize={20}>
                  Date
                </Th>
                <Th color='Black' px={10} py={4} fontSize={20}>
                  Workout Type
                </Th>
                <Th color='Black' px={10} py={4} fontSize={20}>
                  Duration (min)
                </Th>
                <Th color='Black' px={10} py={4} fontSize={20}>
                  Calories Burned
                </Th>
                <Th color='Black' px={10} py={4} fontSize={20}>
                  Actions
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {activities.map((activity: any, index: number) => (
                <Tr key={index} textAlign='end' p={7}>
                  <Td px={10} py={4}>
                    {new Date(activity.date).toLocaleDateString()}{" "}
                  </Td>
                  <Td px={10} py={4}>
                    {activity.workoutType}
                  </Td>
                  <Td px={10} py={4}>
                    {editing === activity.id ? (
                      <Input
                        value={updatedData.duration}
                        onChange={(e) =>
                          setUpdatedData((prev) => ({
                            ...prev,
                            duration: Number(e.target.value),
                          }))
                        }
                        size='sm'
                      />
                    ) : (
                      activity.duration
                    )}
                  </Td>
                  <Td pr={15}>
                    {editing === activity.id ? (
                      <Input
                        value={updatedData.caloriesBurned}
                        onChange={(e) =>
                          setUpdatedData((prev) => ({
                            ...prev,
                            caloriesBurned: Number(e.target.value),
                          }))
                        }
                        size='sm'
                      />
                    ) : (
                      activity.caloriesBurned
                    )}
                  </Td>
                  <Td>
                    {" "}
                    <Flex gap={4}>
                      {editing === activity.id ? (
                        <>
                          <HStack gap={4}>
                            <IconButton
                              aria-label='Save'
                              bg='green.500' // Set explicit background color
                              color='white' // Ensure text/icon is visible
                              _hover={{ bg: "green.600" }} // Define hover state
                              onClick={() => handleUpdate(activity.id)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              aria-label='Cancel'
                              bg='red.500' // Set explicit background color
                              color='white' // Ensure text/icon is visible
                              _hover={{ bg: "red.600" }} // Define hover state
                              onClick={() => setEditing(null)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </HStack>
                        </>
                      ) : (
                        <>
                          <HStack gap={4}>
                            <IconButton
                              aria-label='Edit'
                              bg='green.500' // Set explicit background color
                              color='white' // Ensure text/icon is visible
                              _hover={{ bg: "green.600" }} // Define hover state
                              onClick={() => handleEdit(activity)}
                              mr={2}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label='Delete'
                              bg='red.500' // Set explicit background color
                              color='white' // Ensure text/icon is visible
                              _hover={{ bg: "red.600" }} // Define hover state
                              onClick={() => handleDelete(activity.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </HStack>
                        </>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReadActivities;

// import { useQuery } from "@apollo/client";
// import { Spinner, Text, Box, Center } from "@chakra-ui/react";
// import { defineStyleConfig } from "@chakra-ui/react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   TableCaption,
//   Tfoot,
// } from "@chakra-ui/table";
// import { Workouts } from "../utils/queries";

// const ReadActivities = () => {
//   const { loading, error, data } = useQuery(Workouts);

//   if (loading)
//     return (
//       <Center>
//         <Spinner size='xl' />
//       </Center>
//     );
//   if (error) return <Text color='red.500'>Error fetching data</Text>;
//   console.log(data);
//   const activities = data?.workouts || []; // Ensure workouts array exists
//   console.log(activities);

//   return (
//     <Box maxW='800px' mx='auto' mt={6} p={4} boxShadow='md' borderRadius='lg'>
//       <Text fontSize='2xl' fontWeight='bold' mb={4} textAlign='center'>
//         Your Workout Activities
//       </Text>

//       {activities.length === 0 ? (
//         <Text textAlign='center' color='gray.500'>
//           No activities found.
//         </Text>
//       ) : (
//         <TableContainer>
//           <Table
//             variant='striped'
//             colorScheme='blue'
//             size='md' // More compact than 'lg'
//           >
//             <Thead>
//               <Tr>
//                 <Th color='white'>Date</Th>
//                 <Th color='white'>Workout Type</Th>
//                 <Th color='white'>Duration (min)</Th>
//                 <Th color='white'>Calories Burned</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {activities.map((activity: any, index: number) => (
//                 <Tr key={index}>
//                   <Td px={4} py={2}>
//                     {new Date(activity.date).toLocaleDateString()}
//                   </Td>
//                   <Td px={4} py={2}>
//                     {activity.workoutType}
//                   </Td>
//                   <Td px={4} py={2} isNumeric>
//                     {activity.duration}
//                   </Td>
//                   <Td px={4} py={2} isNumeric>
//                     {activity.caloriesBurned}
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default ReadActivities;
