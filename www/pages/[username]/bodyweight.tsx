import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Flex,
  Box,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  Input,
  Stack
} from "@chakra-ui/core";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useState } from "react";
import UserProfileSidebar from "../../components/UserProfileSidebar";
import { formatDistanceToNow } from "date-fns";

const GET_USER_BODYWEIGHT = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      username
      email
      picture
      bodyweights(orderBy: { createdAt: desc }) {
        id
        weight
        createdAt
      }
    }
  }
`;

const CREATE_BODYWEIGHT = gql`
  mutation CreateBodyweight($data: BodyweightCreateInput!) {
    createOneBodyweight(data: $data) {
      id
      weight
      createdAt
    }
  }
`;

const BodyweightPage = () => {
  const { loading, error, data } = useQuery(GET_USER_BODYWEIGHT, {
    variables: {
      where: {
        username: "andy"
      }
    }
  });

  const [
    createBodyweight,
    { data: mutationData, error: mutationError }
  ] = useMutation(CREATE_BODYWEIGHT, {
    update(cache, { data: { createOneBodyweight } }) {
      const { user } = cache.readQuery({
        query: GET_USER_BODYWEIGHT,
        variables: {
          where: {
            username: "andy"
          }
        }
      });

      console.log(user);

      cache.writeQuery({
        query: GET_USER_BODYWEIGHT,
        variables: {
          where: {
            username: "andy"
          }
        },
        data: {
          user: {
            ...user,
            bodyweights: [createOneBodyweight, ...user.bodyweights]
          }
        }
      });
    }
  });

  const loggedInUser = useLoggedInUser();

  const [weight, setWeight] = useState(null);

  if (loading) return <div>loading...</div>;

  return (
    <Flex p={6}>
      <Box width={["100%", "25%"]}>
        <UserProfileSidebar user={data.user} />
      </Box>

      <Box width={["100%", "75%"]} px={6}>
        {loggedInUser && loggedInUser.username === data.user.username ? (
          <Flex>
            <Input
              placeholder="Weight"
              width={"100px"}
              mr={4}
              onChange={e => setWeight(parseInt(e.target.value))}
            />
            <Button
              mb={4}
              onClick={e => {
                e.preventDefault();

                if (weight && weight > 0) {
                  createBodyweight({
                    variables: {
                      data: {
                        weight,
                        user: {
                          connect: {
                            id: data.user.id
                          }
                        }
                      }
                    }
                  });
                }
              }}
            >
              Add
            </Button>
          </Flex>
        ) : null}

        <Stack spacing={3}>
          {data.user.bodyweights.map(bodyweight => (
            <Stat key={bodyweight.id}>
              <StatLabel>Weight</StatLabel>
              <StatNumber>{bodyweight.weight} lbs</StatNumber>
              <StatHelpText>{bodyweight.createdAt}</StatHelpText>
            </Stat>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default BodyweightPage;
