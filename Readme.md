## 🧩 Native Boilerplate

A production-ready Expo boilerplate with dynamic configuration, clean architecture, and Yarn-based tooling — perfect for scalable React Native apps.

---

### 🚀 Usage

Using **Yarn** (recommended):

```bash
yarn create expo-app my-app --template https://github.com/rms-apps/native-boiler-plate --yarn
```

or using npx

```bash
npx create-expo-app my-app --template https://github.com/rms-apps/native-boiler-plate --yarn
```

this template defaults to Yarn. All scripts in package.json use Yarn commands.

- You can use this command too but then you need to make changes in package.json file

```bash
npx create-expo-app my-app --template https://github.com/rms-apps/native-boiler-plate
```

### 🔧 Setup

This template uses a hybrid `.env` + `template.config.js` approach.

- All values will first be taken from `.env`
- If not found, fallback values from `template.config.js` will be used
- Create .env from Example
- To get started, create your local .env file by copying the provided example:

```bash
cp .env.example .env
```

- Then edit the .env file and update the values as needed for your app.
