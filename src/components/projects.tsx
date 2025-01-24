// Utility function for styled span
const span = (content: string, classes: string, styles?: string) =>
    `<span class="${classes}" ${
      styles ? `style="${styles}"` : ''
    }>${content}</span>`;
  
  // Utility function for link
  const link = (url: string, content: string) =>
    `<a href="${url}" target="_blank" style="text-decoration: none">${content}</a>`;
  
  // Utility function for tags
  const tag = (content: string, color: string) => {
    // const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~©®₿¥€£¢₹§¶∆×÷¿¡';
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~©λ';
  
    return `<span 
      class="inline-block cursor-pointer vertical-align: center crt-text" 
      style="background: ${color}15; color: ${color}; border-radius: 4px; padding: 0 0.5em; margin: 0 0.25em; display:inline-flex;  align-items: center; font-size: 0.9em; height:1.35em; line-height: 1.35em ; animation: inherit"
      onmouseover="
        const originalText = this.textContent;
        this.glitchTimer = setInterval(() => {
          this.textContent = [...originalText]
            .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
            .join('');
        }, 50);
      "
      onmouseout="
        clearInterval(this.glitchTimer);
        const originalText = '${content}';
        let currentIdx = 0;
        const restoreInterval = setInterval(() => {
          if (currentIdx >= originalText.length) {
            clearInterval(restoreInterval);
            return;
          }
          this.textContent = 
            originalText.slice(0, currentIdx + 1) + 
            [...originalText.slice(currentIdx + 1)]
              .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
              .join('');
          currentIdx++;
        }, 50);
      "
    >${content}</span>`;
  };
  
  
const titleColor = 'text-dark-purple';
const dateColor = 'text-dark-gray';
  
  // Work experience data
  export const projectsData = [
    {
        year: '2024',
        projects: [
            {
                color: '#CC8E15',
                name: span(`Trading ${span('Fours', 'text-dark-t4')}`, ''),
                duration: span('March 2024 - August 2024', dateColor),
                details: [
                  'Developed a music recommendation engine, focusing on artistic diversity & user-taste profiling',
                  'Trained an XGBoost Genre Classifier with 200,000+ manually preprocessed tracks',
                  'Deployed on AWS with a multi-container orchestration system using Docker and a ' + span(link('https://github.com/stanley-utf8/trading-fours/blob/master/.github/workflows/main.yml', 'custom CI/CD pipeline'), 'text-dark-blue'),
                  'NOTE: Sadly, I took the site down after a few months of uptime \n    because' + span(link('https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api', ' Spotify deprecated some core API endpoints '), 'text-dark-blue'),
                ],
                images: [
                  '/proj/t4-1.png', 
                  '/proj/t4-2.png',
                  '/proj/t4-4.png',
                ],
                tags: [
                    'python',
                    'pandas',
                    'xgboost',
                    'api',
                    'javascript',
                    'react',
                    'tailwind',
                    'aws',
                    'docker',
                    'mysql',
                    'redis',
                    'nginx',
                    'machine-learning'
                ],
                
                links: [
                    span(link('https://github.com/stanley-utf8/trading-fours', `${span('', '', 'font-size: 1.2em;')} Code`), ''),
                    span(link('https://www.youtube.com/watch?v=sx5btkY24hQ&feature=youtu.be', 'Video Demo & Why I Built It'), 'text-dark-blue'),
                ]
            },
            {
                name: span('Datamines', 'text-dark-datamines'),
                duration: span('November 2024', dateColor),
                color: '#FFB6C1',
                details: [
                    'Built an atmospheric 2D platformer with a team of 3 for McGill CodeJam in 36 hours using Unity',
                    'Created an adaptive soundtrack with linear interpolation between normal/intense tracks based on game state',
                    'Implemented progressive difficulty scaling that automatically adjusts spawn rates & objective timings'
                ],
                tags: [
                    'unity',
                    'c#',
                    'game-development',
                    'audio-processing',
                    'procedural-generation'
                ],
                images: [
                    '/proj/dm-1.png',
                    '/proj/dm-2.png',
                ],
                links: [
                    span(link('https://github.com/CRook99/DATAMINES', `${span('', '', 'font-size: 1.2em;')} Code`), ''),
                    span(link('https://averageosiris.itch.io/datamines', 'Play Me!'), 'text-dark-blue'),
                ]
            },
            {
                name: span('Chani', 'text-dark-chani'),
                duration: span('November 2024', dateColor),
                color: '#F18904',
                details: [
                    'Engineered an OCaml console chat server with concurrent client handling using TCP sockets & asynchronous I/O channels',
                    'Designed an application-layer protocol with custom packet framing for reliable user-to-user communication and server broadcasts'
                ],
                tags: [
                    'ocaml',
                    'networking',
                    'concurrent-programming',
                    'protocol-design'
                ],
                links: [
                    span(link('https://github.com/stanley-utf8/chani', `${span('', '', 'font-size: 1.2em;')} Code`), '')
                ]
            },
            
        ]
    }
];
  
  const expandableImage = (src: string, alt: string) => `
  <div class="inline-block">
    <img 
      src="${src}" 
      alt="${alt}"
      class="max-w-[350px] max-h-[200px] w-auto h-auto object-contain rounded cursor-pointer hover:opacity-80 transition-opacity"
      onclick="window.open('${src}', '_blank')"
    />
  </div>
`;
  
  // Function to render work experience
  export const projectsOutput = async (): Promise<string> => {
    let result = `
┌──────────────────────────────────────────────────────────────┐
│                          Projects                            │
└──────────────────────────────────────────────────────────────┘
`;
    projectsData.forEach((entry) => {
      entry.projects.forEach((project) => {
        result += `
${
          project.name
          ? `${project.name} | ${project.duration}`
          : `${project.name} | ${project.duration}`
      }${
        project.details
          ? `

  • ${project.details.join('\n  • ')} `

         : ''
     }${
      project.images
          ? `<div class="flex flex-row gap-4" style="margin-left: 12px;">
      ${project.images.map(img => expandableImage(img, 'Project screenshot')).join('')}
    </div> ${project.tags ? project.tags.map((t) => tag(t, project.color)).join('') : ''}`: `
    ${
       project.tags
         ? `
 ${project.tags.map((t) => tag(t, project.color)).join('')}`
         : ''
     }`
  }${
       project.links
         ? `

  [ ${project.links.join(' | ')} ]`
         : ''
     }

<span style="opacity: 0.7">──────────────────────────────</span>
     `;

    });
  });
  result += `\n hint: scroll up in case you missed something!\n`

  return result;
};

export default projectsOutput;