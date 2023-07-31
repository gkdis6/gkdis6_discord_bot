import { Client as NotionClient } from "@notionhq/client";
const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });

export async function saveCode(username, code) {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      코드: {
        title: [
          {
            text: {
              content: code,
            },
          },
        ],
      },
      닉네임: {
        select: {
          name: username,
        },
      },
    },
  });
  return true;
}

export async function loadCode(username) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "닉네임",
      select: {
        equals: username,
      },
    },
    sort: [
      {
        property: "상태",
        direction: "descending",
      },
    ],
    page_size: 1,
  });
  const code = response.results[0].properties["코드"].title[0].text.content;
  return code ? code : "데이터가 없습니다. 세이브를 해주세요."
}
