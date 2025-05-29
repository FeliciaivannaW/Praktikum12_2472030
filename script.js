if (!localStorage.getItem('products')) {
  fetch('produk.json')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
      location.reload();
    });
}

let products = JSON.parse(localStorage.getItem('products')) || [];
let currentEditId = null;

function generateId() {
  return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

function renderTable() {
  const tbody = document.getElementById("tabelProduk");
  tbody.innerHTML = "";

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Tidak ada produk</td></tr>`;
    return;
  }

  products.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.description}</td>
        <td>${p.stock}</td>
        <td>
          <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn-hapus" onclick="deleteProduct(${p.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function resetForm() {
  document.getElementById("formProduk").reset();
  document.getElementById("btnSubmit").textContent = "Tambah Produk";
  currentEditId = null;
}

function addProduct(product) {
  product.id = generateId();
  products.push(product);
  saveAndRender();
}

function updateProduct(updatedProduct) {
  const index = products.findIndex(p => p.id === currentEditId);
  if (index !== -1) {
    products[index] = { id: currentEditId, ...updatedProduct };
    saveAndRender();
  }
}

function deleteProduct(id) {
  if (confirm("Yakin ingin menghapus produk ini?")) {
    products = products.filter(p => p.id !== id);
    saveAndRender();
  }
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
    document.getElementById('description').value = product.description;
    document.getElementById("btnSubmit").textContent = "Update Produk";
    currentEditId = id;
  }
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderTable();
  resetForm();
}

document.getElementById("formProduk").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const stock = parseInt(document.getElementById('stock').value.trim());
  const description = document.getElementById('description').value.trim();

  if (!name || !price || !description || isNaN(stock)) {
    alert("Semua kolom wajib diisi dengan benar!");
    return;
  }

  const newData = { name, price, description, stock };

  if (currentEditId === null) {
    addProduct(newData);
  } else {
    updateProduct(newData);
  }
});

renderTable();