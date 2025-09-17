# SentinelAI Documentation

This is the documentation website for **SentinelAI Documentation** on how to run it and update it.

## Running the website locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaayoos/sentinelai-docs.git
   cd sentinelai-docs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:8000
   ```
---

## Contributing

This page was made rather quickly, so any contributions are welcome :)


1. **Fork** this repository.

2. Create a new branch for your changes:

   ```bash
   git checkout -b feature/my-new-docs
   ```

3. Add or edit Markdown files in:

   ```
   src/data/markdown
   ```

   * Edit an existing `.md` file to update content.
   * Add a new `.md` file for a new documentation page.

4. If you add a new page, also update:

   ```
   src/data/docs.ts
   ```

   * Register your new page under the correct category.
   * Or create a new category if needed.

5. Run locally to verify:

   ```bash
   npm run dev
   ```

6. Commit and push your changes:

   ```bash
   git commit -m "Add: new documentation page"
   git push origin feature/my-new-docs
   ```

7. Open a **Pull Request** to the `main` branch.




## License
```
This project is licensed under the MIT License.
```
