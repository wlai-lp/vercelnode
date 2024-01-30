import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'cookie'
import axios from 'axios';

interface SkillType {
    skillOrder: number;
    deleted: boolean;
    canTransfer: boolean;
    maxWaitTime: number;
    skillRoutingConfiguration: any[]; // Replace 'any' with a more specific type if known
    name: string;
    description: string;
    fallbackWhenAllAgentsAreAway: boolean;
    id: number;
    dateUpdated: string;
    postConversationSurveyAppInstallAssociationId: string;
  }

export default async (req: VercelRequest, res: VercelResponse) => {

    console.log(`Get skills from ${req.query.param}`);
    // const lpSourceSite = req.cookies['LPsoucesiteid'];
    // const lpDestSite = req.cookies['LPdestiteid'];

    // console.log(req.headers.cookie);
    const rawCookieHeader = req.headers.cookie || '';

    const cookies = parse(rawCookieHeader);
    const siteId = req.query.param == "source" ? cookies['LPsourcesiteid'] : cookies['LPdestiteid']
    const token = req.query.param == "dest" ? cookies['LPsourcetoken'] : cookies['LPsourcetoken']
    console.log(`site = ${siteId} and token ${token}`);

    // Parse the raw cookie header using the cookie package
    // console.log(cookies['LPsourcetoken']);

  const skillCardTemplate = `
  <!-- Small Card -->
<div class="bg-white p-6 my-4 rounded-lg shadow-md">
  <!-- Card Content -->
  <h2 class="text-lg font-semibold mb-2">{name}</h2>
  <p class="text-gray-600 text-sm">{description}</p>
</div>
  
  `;  

  // login and get auth token
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://va.ac.liveperson.net/api/account/${siteId}/configuration/le-users/skills?v=2.0&source=ccuiUm&select=$all`,
    headers: { 
        'authorization': `Bearer ${token}`, 
        'content-type': 'application/json; charset=utf-8', 
        'Cookie': 'JSESSIONID=B640FAC3AA64EF4DB6215710DAE0857A'
      }
  };

  let htmlContent = "";
  try {
    console.log('start get skills request');
    const response = await axios.request(config);
    console.log('done get skills request');
    const skills: SkillType[] = response.data.map((data) => ({
        name: data.name,
        description: data.description
    }));
    console.log(skills.length);
    const skillCards: string[] = skills.map((skill) => {
        return skillCardTemplate.replace("{name}", skill.name).replace("{description}", skill.description);
    });
    htmlContent = skillCards.join(" ");
    // console.log(JSON.stringify(response.data));
    res.setHeader('Content-Type', 'text/html');

  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Internal Server Error2' });
  }
  res.status(200).send(htmlContent);

};