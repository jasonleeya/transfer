const names = ["优好汇", "九溪茶行", "和草集洗护清洁旗舰店"];
const ls = [];
for (let i = 0; i < 100; i++) {
  ls.push({
    name: names[i % 3] + "_" + (i + 1),
    id: i + 1,
    isChecked: false
  });
}

export default function getListMockApi(
  page = 1,
  pageSize = 5,
  searchValue = ""
) {
  let list;
  let total;
  if (searchValue) {
    list = ls.filter(
      (item) =>
        item.name.indexOf(searchValue) > -1 ||
        String(item.id).indexOf(searchValue) > -1
    );
  } else {
    list = ls;
  }
  total = list.length;
  let start = (page - 1) * pageSize;
  let end = start + pageSize;
  list = JSON.parse(JSON.stringify(list.slice(start, end)));
  return Promise.resolve({
    list,
    total
  });
}
