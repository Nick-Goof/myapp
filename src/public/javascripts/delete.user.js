console.log("delete.user.js is geladen");
function deleteFetch(userId, callback) {
  fetch(`./users/${userId}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((response) => {})
    .catch((err) => {});
}

function deleteButtonClicked(userId, buttonElement) {
  deleteFetch(userId, (error, result) => {
    if (error) {
    }
    if (result) {
      //delete row from table in DOM
    }
  });
}
