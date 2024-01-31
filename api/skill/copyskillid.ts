import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'cookie';
import axios from 'axios';

type SkillSaveType = {
  id: null;
  name: string;
  description: string;
  maxWaitTime: number;
  skillRoutingConfiguration: any[]; // Replace 'any' with a more specific type if known
  defaultPostChatSurveyId: null;
  defaultOfflineSurveyId: null;
  defaultAgentSurveyId: null;
  wrapUpTime: null;
  lobIds: any[]; // Replace 'any' with a more specific type if known
  canTransfer: boolean;
  skillTransferList: any[]; // Replace 'any' with a more specific type if known
  slaDefaultResponseTime: null;
  slaUrgentResponseTime: null;
  slaFirstTimeResponseTime: null;
  transferToAgentMaxWaitInSeconds: null;
  workingHoursId: null;
  specialOccasionId: null;
  autoCloseInSeconds: null;
  fallbackSkill: null;
  fallbackWhenAllAgentsAreAway: boolean;
  agentSurveyForMsgId: null;
  agentSurveyForMsgTimeoutInMinutes: null;
  redistributeLoadToConnectedAgentGroups: boolean;
};

interface SkillReponseType {
  skillOrder: number;
  deleted: boolean;
  canTransfer: boolean;
  maxWaitTime: number;
  skillRoutingConfiguration: any[]; // Replace 'any' with a more specific type if known
  name: string;
  description: string;
  redistributeLoadToConnectedAgentGroups: boolean;
  fallbackWhenAllAgentsAreAway: boolean;
  id: number;
  dateUpdated: string;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  console.log(`copy skill id ${req.query.id}`);
  // const lpSourceSite = req.cookies['LPsoucesiteid'];
  // const lpDestSite = req.cookies['LPdestsiteid'];

  // console.log(req.headers.cookie);
  const rawCookieHeader = req.headers.cookie || '';

  const cookies = parse(rawCookieHeader);
  const skillId = req.query.id;
  const siteId = cookies['LPsourcesiteid'];
  const destSiteId = cookies['LPdestsiteid'];
  const token = cookies['LPsourcetoken'];
  const desttoken = cookies['LPdesttoken'];
  console.log(
    `copy skill ${skillId} from site ${siteId} and use token ${token}`,
  );

  // get skill by id
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://va.ac.liveperson.net/api/account/${siteId}/configuration/le-users/skills/${skillId}`,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json; charset=utf-8',
    },
  };

  let htmlContent = 'no content';
  try {
    const response = await axios.request(config);
    // this is the simplest case, there might be other skill references
    const skillData: SkillReponseType = response.data;
    console.log(`retrieve skill data ${skillData.name}`);

    let data: SkillSaveType = {
      id: null,
      name: skillData.name,
      description: skillData.description,
      maxWaitTime: skillData.maxWaitTime,
      skillRoutingConfiguration: [], // Replace 'any' with a more specific type if known
      defaultPostChatSurveyId: null,
      defaultOfflineSurveyId: null,
      defaultAgentSurveyId: null,
      wrapUpTime: null,
      lobIds: [], // Replace 'any' with a more specific type if known
      canTransfer: skillData.canTransfer,
      skillTransferList: [], // Replace 'any' with a more specific type if known
      slaDefaultResponseTime: null,
      slaUrgentResponseTime: null,
      slaFirstTimeResponseTime: null,
      transferToAgentMaxWaitInSeconds: null,
      workingHoursId: null,
      specialOccasionId: null,
      autoCloseInSeconds: null,
      fallbackSkill: null,
      fallbackWhenAllAgentsAreAway: skillData.fallbackWhenAllAgentsAreAway,
      agentSurveyForMsgId: null,
      agentSurveyForMsgTimeoutInMinutes: null,
      redistributeLoadToConnectedAgentGroups:
        skillData.redistributeLoadToConnectedAgentGroups,
    };

    // save skill to destination site
    const createSkillConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://va.ac.liveperson.net/api/account/${destSiteId}/configuration/le-users/skills?v=2.0`,
      headers: {
        authorization: `Bearer ${desttoken}`,
        'content-type': 'application/json; charset=utf-8',
      },
      data: data, //JSON.stringify(req.body)
    };

    console.log('start send create skill request');
    const createSkillResponse = await axios.request(createSkillConfig);
    console.log(JSON.stringify(createSkillResponse.data));
    console.log('done send create skill request');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('HX-Trigger', 'myEvent');
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'Internal Server Error2' });
  }

  res.status(200).send(htmlContent);
};
