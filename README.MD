Typescript Setup following these guideline - https://www.digitalocean.com/community/tutorials/typescript-new-project
Routes setup following - https://github.com/mongodb-developer/mongodb-typescript-example/blob/finish/src/services/database.service.ts

Local container connection IP address must be set to the DB ipaddress. Local host does not work
- docker inspect mongodb
- Search for  "Networks": {
                "pbtech_pbtech": {
                    .....
                    "IPAddress": "172.25.0.3",

Git Workflow
- Feature push .  feature/*   Push to image with tag featurepush
- Pull request.   PR to main.      Push to image with tag PR
- Merge.  Merege to main. Build test and push image with tag latest
.. TODO add "release" to trigger product release