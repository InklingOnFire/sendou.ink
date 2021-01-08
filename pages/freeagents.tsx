import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { t, Trans } from "@lingui/macro";
import { Playstyle } from "@prisma/client";
import Breadcrumbs from "components/common/Breadcrumbs";
import Markdown from "components/common/Markdown";
import MyContainer from "components/common/MyContainer";
import MyLink from "components/common/MyLink";
import SubText from "components/common/SubText";
import SubTextCollapse from "components/common/SubTextCollapse";
import UserAvatar from "components/common/UserAvatar";
import WeaponImage from "components/common/WeaponImage";
import FAModal from "components/freeagents/FAModal";
import { countries, getEmojiFlag } from "countries-list";
import { useFreeAgents } from "hooks/freeagents";
import { sendData } from "lib/postData";
import { Unpacked } from "lib/types";
import { useMyTheme } from "lib/useMyTheme";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { GetAllFreeAgentPostsData } from "prisma/queries/getAllFreeAgentPosts";
import { RefObject, useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  RiAnchorLine,
  RiMicFill,
  RiPaintLine,
  RiSwordLine,
} from "react-icons/ri";

const FreeAgentsPage = () => {
  const {
    data,
    isLoading,
    usersPost,
    playstyleCounts,
    state,
    dispatch,
  } = useFreeAgents();
  const router = useRouter();
  const postRef = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const idToScrollTo = Number.isNaN(parseInt(router.query.id as any))
    ? undefined
    : parseInt(router.query.id as any);

  useEffect(() => {
    if (!postRef.current) return;

    postRef.current.scrollIntoView();
  }, [postRef.current]);

  return (
    <MyContainer>
      {modalIsOpen && (
        <FAModal post={usersPost} onClose={() => setModalIsOpen(false)} />
      )}
      <Breadcrumbs pages={[{ name: t`Free Agents` }]} />
      <Button onClick={() => setModalIsOpen(true)}>
        {usersPost ? (
          <Trans>Edit free agent post</Trans>
        ) : (
          <Trans>New free agent post</Trans>
        )}
      </Button>
      {!isLoading && (
        <Center mt={6}>
          <RadioGroup
            value={state.playstyle ?? "ALL"}
            onChange={(value) =>
              dispatch({
                type: "SET_PLAYSTYLE",
                playstyle: value === "ALL" ? undefined : (value as Playstyle),
              })
            }
          >
            <Stack spacing={4} direction={["column", "row"]}>
              <Radio value="ALL">
                <Trans>
                  All (
                  {playstyleCounts.FRONTLINE +
                    playstyleCounts.MIDLINE +
                    playstyleCounts.BACKLINE}
                  )
                </Trans>
              </Radio>
              <Radio value="FRONTLINE">
                <Trans>Frontline ({playstyleCounts.FRONTLINE})</Trans>
              </Radio>
              <Radio value="MIDLINE">
                <Trans>Support ({playstyleCounts.MIDLINE})</Trans>
              </Radio>
              <Radio value="BACKLINE">
                <Trans>Backline ({playstyleCounts.BACKLINE})</Trans>
              </Radio>
            </Stack>
          </RadioGroup>
        </Center>
      )}
      {data.map((post) => (
        <FreeAgentCard
          key={post.id}
          post={post}
          isLiked={false}
          postRef={post.id === idToScrollTo ? postRef : undefined}
        />
      ))}
    </MyContainer>
  );
};

const playstyleToEmoji = {
  FRONTLINE: RiSwordLine,
  MIDLINE: RiPaintLine,
  BACKLINE: RiAnchorLine,
} as const;

const FreeAgentCard = ({
  post,
  isLiked,
  postRef,
}: {
  post: Unpacked<GetAllFreeAgentPostsData>;
  isLiked: boolean;
  postRef?: RefObject<HTMLDivElement>;
}) => {
  const { themeColorShade } = useMyTheme();
  const [user] = useUser();

  const handleClick = async () => {
    await sendData("PUT", "/api/freeagents/like", { likedId: post.id });
  };

  return (
    <>
      <Box ref={postRef} as="section" my={8}>
        <Flex alignItems="center" fontWeight="bold" fontSize="1.25rem">
          <UserAvatar user={post.user} mr={3} />
          <MyLink href={`/u/${post.user.discordId}`} isColored={false}>
            {post.user.username}#{post.user.discriminator}
          </MyLink>
        </Flex>

        {post.user.profile?.country && (
          <Box ml={2} my={2}>
            <Box as="span" mr={2}>
              {getEmojiFlag(post.user.profile.country)}{" "}
            </Box>
            {
              Object.entries(countries).find(
                ([key]) => key === post.user.profile?.country
              )![1].name
            }
          </Box>
        )}

        {post.user.profile?.weaponPool.length && (
          <Box my={2}>
            {post.user.profile.weaponPool.map((wpn) => (
              <WeaponImage key={wpn} name={wpn} size={32} />
            ))}
          </Box>
        )}

        <Flex mt={4} mb={2}>
          {post.playstyles.map((style) => (
            <Box
              key={style}
              w={6}
              h={6}
              mx={1}
              color={themeColorShade}
              as={playstyleToEmoji[style]}
            />
          ))}
        </Flex>

        {post.canVC !== "NO" && (
          <Flex alignItems="center" my={4}>
            <Box
              w={6}
              h={6}
              mx={1}
              mr={2}
              color={themeColorShade}
              as={RiMicFill}
            />
            <SubText>
              {post.canVC === "YES" ? (
                <Trans>Can VC</Trans>
              ) : (
                <Trans>Can VC sometimes</Trans>
              )}
            </SubText>
          </Flex>
        )}

        <SubTextCollapse
          title={t`Free agent post`}
          isOpenByDefault
          mt={4}
          my={6}
        >
          <Markdown value={post.content} smallHeaders />
        </SubTextCollapse>
        {post.user.profile?.bio && (
          <SubTextCollapse title={t`Bio`} mt={4}>
            <Markdown value={post.user.profile.bio} smallHeaders />
          </SubTextCollapse>
        )}
        {user && post.user.discordId !== user.discordId && false && (
          <IconButton
            color="red.500"
            aria-label="Like"
            size="lg"
            isRound
            variant="ghost"
            icon={isLiked ? <FaHeart /> : <FaRegHeart />}
            onClick={handleClick}
          />
        )}
      </Box>
      <Divider />
    </>
  );
};

export default FreeAgentsPage;