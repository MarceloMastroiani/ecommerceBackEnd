const addToCart = (cartId, productId) => {
  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "POST",
  }).then((res) => {
    if (res.status == 200) {
      window.location.reload();
    }
  });
};

const purchaseCart = (cartId, email) => {
  fetch(`/api/carts/${cartId}/${email}/purchase`, {
    method: "GET",
  }).then((res) => {
    if (res.status == 200) {
      Swal.fire({
        title: "Compra exitosa!",
        text: "Presiona OK para volver a la página principal.",
        icon: "success",
      }).then(() => {
        window.location.replace("/products");
      });
      //window.location.reload();
    }
  });
};

const deleteFromCart = (cartId, productId) => {
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status == 200) {
      window.location.reload();
    }
  });
};
