# setup

To contribute to this project or build everything locally, start by cloning the repository:

```bash
git clone https://github.com/paginas-secretas/paginas-secretas
```

Afterwards, install the client-side Git hooks to automatically format and lint the project before pushing new commits.

```bash
./hooks/INSTALL
```

Then, install all the dependencies the project requires to be built.

```bash
npm i
```

To properly run this service, you will need to a setup a `.env` file. Start by creating a copy of the `.env.example` file and fill the variables with values appropriate for the execution context.

|        Variable Name        | Variable Description  |
| :-------------------------: | :-------------------- |
| `VITE_CONTACTS_MANAGER_URL` | Contacts Manager URL. |

If everything finished successfully, you're ready to start hacking around! The table below will onboard you on the available commands to use.

| Script                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | start the development server              |
| `npm run preview`       | start production app server               |
| `npm run typesafe-i18n` | update localization files                 |
| `npm run lint`          | analyze and lint the project              |
| `npm run format`        | format the project based on lint feedback |
| `npm run build`         | build app in production environment       |
| `npm run deploy`        | deploys built app to GitHub Pages         |
