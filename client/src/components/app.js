import { PostCreate } from "./post-creaate";
import { PostList } from "./post-list";

export const App = () => {
  return (
    <main className="p-4">
      <h1 className="text-4xl text-center">BLOG with microservices</h1>
      <div className="grid lg:grid-cols-[30%_1fr]">
        <section className="mt-10">
          <PostCreate />
        </section>
        <section className="mt-10 lg:ml-4">
          <PostList />
        </section>
      </div>
    </main>
  );
}

