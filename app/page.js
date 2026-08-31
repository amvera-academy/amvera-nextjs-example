"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Запросы ещё не выполнялись");
  const [body, setBody] = useState("—");

  async function request(path, options = {}) {
    const response = await fetch(path, options);
    const result = await response.json();
    setStatus(`${options.method || "GET"} ${path} — HTTP ${response.status}`);
    setBody(JSON.stringify(result, null, 2));
    return result;
  }

  async function loadItems() {
    const result = await request("/api/items");
    setItems(result.items || []);
  }

  useEffect(() => { loadItems(); }, []);

  async function addItem(event) {
    event.preventDefault();
    await request("/api/items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    setName("");
    await loadItems();
  }

  async function deleteItem(id) {
    await request(`/api/items/${id}`, { method: "DELETE" });
    await loadItems();
  }

  return <main>
    <h1>Next.js на Amvera</h1>
    <p>Пример API, статических файлов и постоянного хранилища.</p>
    <section><h2>Проверка приложения</h2><button onClick={() => request("/api/health")}>Выполнить GET /api/health</button><a href="/demo.txt" target="_blank">Открыть статический файл</a></section>
    <section>
      <h2>Элементы</h2>
      <form onSubmit={addItem}><input value={name} onChange={event => setName(event.target.value)} maxLength="120" placeholder="Название элемента" required /><button type="submit">Выполнить POST /api/items</button></form>
      <button onClick={loadItems}>Выполнить GET /api/items</button>
      <div>{items.map(item => <div className="item" key={item.id}><span>#{item.id} — {item.name}</span><button onClick={() => deleteItem(item.id)}>DELETE /api/items/{item.id}</button></div>)}</div>
    </section>
    <section><h2>Ответ</h2><div>{status}</div><pre>{body}</pre></section>
  </main>;
}
