# Retail-Sales-Mockup

# Introduction

This is a data visualization mockup of retail sales data of 207. It has a retail line chart and a seasonal percentage pie chart. In addition, a fact table.

# Known Issue

Tried migrating to TS in dev branch, TS failed to launch very likely because of ts-node compatability. Chose to touch up visualization due to time limit. Check out dev it needed.

# Devolper Change Log

01/18

Npm Install redux to initialize package.json

Add assets (data and logo) to static folder

Dev branch - pushed to main branch when its production

Actions, reducers, stores. Components.

Webpack - index.js, html, css.

01/19

Launch on 3000 and debugging….

Installed nodemon for easier debugging

State was always empty, had trouble reading productData. Refactored redux, removed actions and reducer, put the same logic in productSlice. Also used thunk to export all redux slice related code.

MVP done

01/20
Migrate to TS

TS failed to launch very likely because of ts-node compatability. Created a new branch styling to continue.

Finished two charts touch up and merged to dev, deleted styling

01/21
Deployed to github
