import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box, Heading, Link } from "@chakra-ui/core";
import UserProfileSidebar from "../components/UserProfileSidebar";
import NextLink from "next/link";

const GET_USER_PROFILE = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      bio
      email
      picture
      profile_songs(last: 1) {
        id
        artist
        title
        url
        thumbnail
      }
      bodyweights(last: 1) {
        id
        weight
        createdAt
      }
      workouts {
        id
        title
        slug
        createdAt
      }
    }
  }
`;

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      where: {
        username: "andy"
      }
    }
  });

  if (loading) return <div>loading...</div>;

  return (
    <Box p={6} margin="0 auto" maxWidth="600px">
      <UserProfileSidebar user={data.user} />
    </Box>
  );
};

export default ProfilePage;
