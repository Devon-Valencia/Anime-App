import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const AniQuestHeader = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text
        fontSize={["24px", "32px", "40px"]}
        fontWeight="bold"
        cursor="pointer"
        _hover={{ color: "white" }}
        textAlign="center"
      >
        <span style={{ color: "#03a9fe" }}>Ani</span>
        <span style={{ color: "white" }}>Quest</span>
      </Text>
    </Link>
  );
};

export default AniQuestHeader;
