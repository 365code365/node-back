

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for courseandcertification
-- ----------------------------
DROP TABLE IF EXISTS `courseandcertification`;
CREATE TABLE `courseandcertification`  (
  `ID` varchar(100) CHARACTER SET utf8mb4  NOT NULL,
  `UserlD` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `UserRole` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `TitleOfCertification` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `NameOfTrainingProvider` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `CourseStart` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `CourseEnd` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `CreatedAt` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `UpdatedAt` datetime NULL DEFAULT NULL,
  `AdminNum` int NULL DEFAULT NULL,
  `SubmissionEndDate` datetime NULL DEFAULT NULL,
  `SubmissionStartDate` datetime NULL DEFAULT NULL,
  `CourseDesc` text CHARACTER SET utf8mb4  NULL,
  `CourseImage` longtext CHARACTER SET utf8mb4  NULL,
  `grade` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `applyRule` varchar(2000) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for courseandcertificationclaim
-- ----------------------------
DROP TABLE IF EXISTS `courseandcertificationclaim`;
CREATE TABLE `courseandcertificationclaim`  (
  `ID` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `UserID` varchar(255) CHARACTER SET utf8mb4  NOT NULL,
  `CourseAndCertificationID` varchar(255) CHARACTER SET utf8mb4  NOT NULL,
  `TotalClaimAmount` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `TotalAmountSpent` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `ExaminationDate` datetime NULL DEFAULT NULL,
  `Remark` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `aprove_status` varchar(1000) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `applyRule` varchar(2000) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  UNIQUE INDEX `uk`(`UserID`, `CourseAndCertificationID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for document
-- ----------------------------
DROP TABLE IF EXISTS `document`;
CREATE TABLE `document`  (
  `ID` varchar(100) CHARACTER SET utf8mb4  NOT NULL,
  `ClaimType` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `ClaimID` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `UserID` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `DocumentType` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Date` datetime NULL DEFAULT NULL,
  `Filename` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Description` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Title` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `RejectionReason` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `FileContent` longtext CHARACTER SET utf8mb4  NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `ID` varchar(100) CHARACTER SET utf8mb4  NOT NULL,
  `MenuTitle` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `PageKey` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `UserID` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'userID array',
  `BtnPermitsFlag` varchar(1000) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `ID` varchar(100) CHARACTER SET utf8mb4  NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '1-valid,2-invalid',
  `UserId` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `UserID` varchar(100) CHARACTER SET utf8mb4  NOT NULL DEFAULT '',
  `FullName` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Role` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `PasswordHash` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `LastPasswordChangeDate` datetime NULL DEFAULT NULL,
  `LastLoginDate` datetime NULL DEFAULT NULL,
  `Status` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  `Gender` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT '2' COMMENT '0-Female,1-Male,2-Unknown',
  `CreateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Grade` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
