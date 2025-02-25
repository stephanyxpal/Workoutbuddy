import { Box, Button, Input, Textarea, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <VStack align="center" p={4}>
      {image && <Image boxSize="100px" borderRadius="full" src={image} alt="Profile" />}
      <Box>
        <label>Upload Profile Picture</label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </Box>
      <Box>
        <label>First Name</label>
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
      </Box>
      <Box>
        <label>Last Name</label>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
      </Box>
      <Box>
        <label>Bio</label>
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
      </Box>
      <Box>
        <label>Fitness Goals</label>
        <Textarea value={fitnessGoals} onChange={(e) => setFitnessGoals(e.target.value)} placeholder="What are your fitness goals?" />
      </Box>
      <Button colorScheme="blue">Save Profile</Button>
    </VStack>
  );
};

export default Profile;
