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
    const token = req.query.param == "source" ? cookies['LPsourcetoken'] : cookies['LPdesttoken']
    console.log(`site = ${siteId} and token ${token}`);

    // Parse the raw cookie header using the cookie package
    // console.log(cookies['LPsourcetoken']);

  const skillsTableTemplate = `
  <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>        
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
</div>  
  `;

  const skillTableTRTemplate = `
  <tr class="hover">
        <th hx-get="/copyskill?id={id}" hx-on:htmx:before-request="alert('Copy skill id {id}!')">{id}</th>
        <td>{name}</td>
        <td>{description}</td>
      </tr>
  `;

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
        'content-type': 'application/json; charset=utf-8'        
      }
  };

  let htmlContent = "no content";
  try {
    console.log('start get skills request');
    const response = await axios.request(config);
    console.log('done get skills request');
    const skills: SkillType[] = response.data.map((data) => ({
        id: data.id,
        name: data.name,
        description: data.description
    }));
    console.log(skills.length);
    const skillCards: string[] = skills.map((skill) => {
        // return skillCardTemplate.replace("{name}", skill.name).replace("{description}", skill.description).replace("{id}", skill.id.toString());
        return skillTableTRTemplate.replace("{name}", skill.name).replace("{description}", skill.description).replaceAll("{id}", skill.id.toString());
    });
    const rows = skillCards.join(" ");

    htmlContent = skillsTableTemplate.replace("{rows}", rows);
    // console.log(JSON.stringify(response.data));
    res.setHeader('Content-Type', 'text/html');

  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Internal Server Error2' });
  }
  res.status(200).send(htmlContent);

};