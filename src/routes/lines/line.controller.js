const line = require("@line/bot-sdk");
// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

require("dotenv").config();

const { findUser, createUser } = require("../../models/users/user.model");
const {
  findOneBlessingCategory,
} = require("../../models/blessingCategories/blessingCategory.model.js");

// nextjs url
const baseURL = process.env.NEXT_URL;

async function httpBase(req, res) {
  res.status(200).json({ data: "testDatas" });
}

function handleEvent(event) {
  // 判斷事件類型
  switch (event.type) {
    case "message":
      return handleMessageEvent(event);
    case "follow":
      return handleFollowEvent(event);
    default:
      // ignore other event types
      return Promise.resolve(null);
  }
}

async function handleMessageEvent(event) {
  // 判斷是否為文字訊息
  if (event.message.type !== "text") {
    // 忽略非文字訊息事件
    return Promise.resolve(null);
  }

  // 獲取用戶的 Line ID
  const lineId = event.source.userId;

  // 判斷用戶輸入的訊息是否為「送祝福」
  if (event.message.text === "送祝福") {
    // 創建包含五個選項的選單
    const carouselTemplate = {
      type: "template",
      altText: "請選擇祝福的方式",
      template: {
        type: "image_carousel",
        columns: [
          {
            imageUrl:
              "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/%E6%B3%A1%E6%B3%A1-02.png",
            action: { type: "message", label: "心想事成", text: "心想事成" },
          },
          {
            imageUrl:
              "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/%E6%96%B9%E6%A0%BC%E6%B5%81%E6%98%9F-02.png",
            action: { type: "message", label: "一路順風", text: "一路順風" },
          },
          {
            imageUrl:
              "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/%E6%96%B9%E6%A0%BC%E6%B5%81%E6%98%9F-03.png",
            action: { type: "message", label: "左右逢源", text: "左右逢源" },
          },
          {
            imageUrl:
              "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/%E6%B3%A1%E6%B3%A1-02.png",
            action: { type: "message", label: "展翅飛翔", text: "展翅飛翔" },
          },
          // Add more columns if needed
        ],
      },
    };

    // 使用 reply API 返回選單給用戶
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [carouselTemplate],
    });
  }

  // 判斷用戶輸入的訊息是否為「送祝福」
  if (event.message.text === "接收祝福") {
    const _message = `https://tku.gu.zhshihpoan.com/myBlessings/${lineId}`;

    // 使用 reply API 返回選單給用戶
    return replyTextMessage(event.replyToken, _message);
  }

  // 祝福 Array
  const array = ["心想事成", "一路順風", "左右逢源", "展翅飛翔"];
  console.log("0", event.message.text, array.includes(event.message.text));

  // 判斷用戶輸入的訊息是否在指定的陣列中
  if (array.includes(event.message.text)) {
    // 如果是，回覆 "嘎嘎嘎"
    const blessingCategory = await findOneBlessingCategoryDatas(
      event.message.text
    );
    const url = `${baseURL}/blessings/${lineId}/${blessingCategory}`;

    // 這裡改成 回傳 template button
    return replyFlexMessage(event.replyToken, `${url}`);
  }

  const echo = { type: "text", text: event.message.text };
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

function handleFollowEvent(event) {
  // 獲取用戶的 Line ID
  const lineId = event.source.userId;
  // 在這裡執行用戶初次加入時的處理
  // 例如，發送歡迎訊息或提示訊息
  const url = `${baseURL}/bindLineId/${lineId}`;
  return replyTextMessage(
    event.replyToken,
    `歡迎加入我們請進入官方網站，綁定ID：\n${url}`
  );
}

// 回覆文字訊息
function replyTextMessage(replyToken, text) {
  const message = {
    type: "text",
    text: text,
  };
  return client.replyMessage({ replyToken: replyToken, messages: [message] });
}

// 回覆 Template Button
function replyTemplateButton(replyToken, url) {
  const templateMessage = {
    type: "template",
    altText: "傳送祝福",
    template: {
      type: "buttons",
      thumbnailImageUrl: "https://example.com/thumbnail.jpg",
      title: "傳送祝福",
      text: "請點擊下方按鈕",
      actions: [
        {
          type: "uri",
          label: "傳送祝福",
          uri: url,
        },
      ],
    },
  };

  return client.replyMessage({
    replyToken: replyToken,
    messages: [templateMessage],
  });
}

function replyFlexMessage(replyToken, url) {
  const flexMessage = {
    type: "flex",
    altText: "傳送祝福",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/%E6%96%B9%E6%A0%BC%E6%B5%81%E6%98%9F-02.png", // 可選圖片 URL
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "請點擊下方按鈕",
            wrap: true,
            weight: "bold",
            size: "md",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "傳送祝福",
              uri: url,
            },
          },
        ],
      },
    },
  };

  return client.replyMessage({
    replyToken: replyToken,
    messages: [flexMessage],
  });
}

// 回覆圖片訊息
function replyImageMessage(replyToken) {
  const message = {
    type: "image",
    originalContentUrl:
      "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/1.png",
    previewImageUrl:
      "https://sbirdatas.s3.ap-northeast-1.amazonaws.com/%E9%85%87%E4%BE%AF%E8%B3%87%E8%A8%8A/14.png",
  };
  return client.replyMessage({ replyToken: replyToken, messages: [message] });
}

// 找到祝福資料
async function findOneBlessingCategoryDatas(name) {
  try {
    const data = await findOneBlessingCategory(name);
    console.log("data", data);

    return data._id.toString();
  } catch (err) {
    console.log("err", err);
  }
}

module.exports = {
  httpBase,
  handleEvent,
};
