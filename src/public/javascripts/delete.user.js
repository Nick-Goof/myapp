console.log("delete.user.js is geladen");
function deleteFetch(userId, callback) {
  fetch(`./users/${userId}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log;
      return callback(undefined, data);
    })
    .catch((err) => {
      callbackk(err);
    });
}

function deleteButtonClicked(userId, buttonElement) {
  deleteFetch(userId, (error, results) => {
    if (error) {
      console.log(error, error);
    }
    if (result) {
      console.log("results", result);
    }
  });
}
