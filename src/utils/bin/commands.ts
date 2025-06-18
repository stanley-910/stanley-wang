import config from '../../../config.json';
import { workOutput, workExperience } from '../../components/work';
import { projectsOutput } from '../../components/projects';
const tag = (content: string) => {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~©λ';
  const alternateWords = [
    '  Developer  ',
    '   Engineer  ',
    '   Student   ',
    '   Musician  ',
    '  Researcher ',
  ];
  // background: rgba(0,102,255,0.1);
  return `<span 
      class="cursor-pointer crt-text"
      style=" color: rgb(137,180,250); border-radius: 4px; font-size: 1em; height:1.5em; line-height: 1.5em; animation: inherit"
      onmouseover="
        if (!this.wordIndex) this.wordIndex = 0;
        if (this.isTransitioning) return;
        
        const alternateWord = '${alternateWords}'.split(',')[this.wordIndex];
        this.wordIndex = (this.wordIndex + 1) % ${alternateWords.length};
        this.currentTarget = alternateWord;
        
        const originalText = this.textContent;
        this.isTransitioning = true;
        
        this.glitchTimer = setInterval(() => {
          this.textContent = originalText
            .split('')
            .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
            .join('');
        }, 50);
        
        this.resolveTimeout = setTimeout(() => {
          clearInterval(this.glitchTimer);
          let currentIdx = 0;
          const resolveInterval = setInterval(() => {
            if (currentIdx >= alternateWord.length) {
              clearInterval(resolveInterval);
              this.isTransitioning = false;
              return;
            }
            this.textContent = 
              alternateWord.slice(0, currentIdx + 1) + 
              alternateWord.slice(currentIdx + 1)
                .split('')
                .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
                .join('');
            currentIdx++;
          }, 50);
        }, 300);
      "
      onmouseout="
        if (this.isTransitioning) {
          // Let current transition complete
          const currentTarget = this.currentTarget;
          const finalText = '${content}';
          
          const checkInterval = setInterval(() => {
            if (!this.isTransitioning) {
              clearInterval(checkInterval);
              
              // Wait 500ms before reverting
              setTimeout(() => {
                let currentIdx = 0;
                const startText = currentTarget;
                
                this.isTransitioning = true;
                const restoreInterval = setInterval(() => {
                  if (currentIdx >= startText.length) {
                    this.textContent = finalText;
                    clearInterval(restoreInterval);
                    this.isTransitioning = false;
                    return;
                  }
                  this.textContent = 
                    startText.slice(0, startText.length - currentIdx - 1) +
                    finalText.slice(startText.length - currentIdx - 1, startText.length - currentIdx) +
                    startText.slice(startText.length - currentIdx)
                      .split('')
                      .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
                      .join('');
                  currentIdx++;
                }, 50);
              }, 500);
            }
          }, 50);
        } else {
          // If no transition is happening, revert immediately
          let currentIdx = 0;
          const finalText = '${content}';
          const startText = this.textContent;
          
          this.isTransitioning = true;
          const restoreInterval = setInterval(() => {
            if (currentIdx >= startText.length) {
              this.textContent = finalText;
              clearInterval(restoreInterval);
              this.isTransitioning = false;
              return;
            }
            this.textContent = 
              startText.slice(0, startText.length - currentIdx - 1) +
              finalText.slice(startText.length - currentIdx - 1, startText.length - currentIdx) +
              startText.slice(startText.length - currentIdx)
                .split('')
                .map(() => '${glitchChars}'[Math.floor(Math.random() * ${glitchChars.length})])
                .join('');
            currentIdx++;
          }, 50);
        }
      "
    >${content}</span>`;
};

// Help
export const help = async (args: string[]): Promise<string> => {
  const commandMap = {
    // Navigation & Info
    about: 'Display information about me',
    help: 'Self-explanatory',
    projects: 'List my most recent projects',
    work: 'List a timeline of my work experience',

    // Contact & Social
    github: 'Visit my Github profile',
    linkedin: 'View my LinkedIn profile',
    resume: 'Open my resume',

    // Utils
    cd: 'Change directory',
    ls: 'List content of current directory',
    tree: 'Display directory structure in a tree-like format',
  };

  const sections = {
    'Navigation & Info': [
      'about',
      'help',
      'projects',
      'work',
    ],
    'Contact & Social': ['github', 'linkedin', 'resume'],
    Utils: ['cd', 'ls', 'tree'],
  };

  let helpText = '\nAvailable commands:\n\n';

  Object.entries(sections).forEach(([section, commands]) => {
    commands.forEach((cmd) => {
      helpText += `  <span class="text-dark-green">${cmd}</span>${' '.repeat(
        15 - cmd.length,
      )} - ${commandMap[cmd]}\n`;
    });
    helpText += '\n';
  });

  return `${helpText}
<span class="text-dark-yellow">[tab]</span>: Trigger completion
<span class="text-dark-yellow">[ctrl+l]</span>/<span class="text-dark-yellow">clear</span>: Clear terminal\n
`;
};


export const resume = (args: string[]): string => {
  const message = 'Opening resume...';
  setTimeout(() => {
    window.open(`${config.resume_url}`);
  }, 500);
  return message;
};


export const github = (args: string[]): string => {
  const message = 'Opening github...';
  setTimeout(() => {
    window.open(`https://github.com/${config.social.github}/`);
  }, 500);
  return message;
};

export const linkedin = async (args: string[]): Promise<string> => {
  const message = 'Opening linkedin...';
  setTimeout(() => {
    window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  }, 500);

  return message;
};

// Search
export const google = (args: string[]): string => {
  const message = `Searching google for ${args.join(' ')}...`;
  setTimeout(() => {
    window.open(`https://google.com/search?q=${args.join(' ')}`);
  }, 500);
  return message;
};

export const reddit = (args: string[]): string => {
  const message = `Searching reddit for ${args.join(' ')}...`;
  setTimeout(() => {
    window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  }, 500);
  return message;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};


export const date = async (args: string[]): Promise<string> => {
  const date = new Date();
  return date
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
};


const openNeovimRepo = (args?: string[]): string => {
  const message = 'nerd';
  setTimeout(() => {
    window.open(`https://github.com/stanley-utf8/.nvim`);
  }, 500);
  return message;
};
export const vim = openNeovimRepo;
export const nvim = openNeovimRepo;
export const vi = openNeovimRepo;

export const about = (args?: string[]): string => {
  const image = `<img src="/ascii-art.png" alt="signature" style="width: 400px; height: auto;" />`;
  return `<span class="w-full">Hi, my name is ${tag(config.name + '!')}\n
I'm in my third year at <a href="https://www.harvard.edu/" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #EF3C2F; animation: inherit">McGill</span> University</a>, studying Computer Science. 

This summer I'm working with <a href="https://www.autodesk.com/" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color:#048C4A; animation: inherit">Autodesk</span></a> on the Flow Production Tracking team,
writing software to <b>single</b> handedly fast track JJK season 3. Just kidding.

Last winter, I joined <a href="https://www.youtube.com/watch?v=NuKBeiHmGJA" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #FBE3BF; animation: inherit">Beta Technologies</span></a>, developing structural analysis tooling 
to help certify eVTOL aircraft.


I am interested in AI ethics, embedded systems, aviation, <a href="https://open.spotify.com/playlist/3df9VZ1kuzGDPO0yRgM5Ih?si=61884c77f73a4e5f" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #CC8E15; animation: inherit">jazz</span></a>,
and designing cool things with my hands, ears, heart, & brain.

<div class="tech-container">
<span >\uf124 Montréal, QC</span><span>|</span>

<a href="https://github.com/${config.social.github
    }" target="_blank" style="text-decoration: none; "><span style="font-size: 1.2em; "></span> Github
</a>
<span>|</span>

<a href="https://linkedin.com/in/${config.social.linkedin
    }" target="_blank" style="text-decoration: none; "><span style="font-size: 1.2em; "></span> LinkedIn</a>
<span>|</span>
<a href="${config.resume_url
    }" target="_blank" style="text-decoration: none; title="Open Resume"> Resume</a>
<span>|</span>
<a onclick="navigator.clipboard.writeText('${config.email}')"
 style="cursor: pointer; text-decoration: none;" title="Copy to clipboard"> Email</a>
<span>|</span>
<a class="crt-text" href="https://github.com/stanley-utf8/dotfiles" target="_blank" style="text-decoration: none; "><span style="animation: inherit" title="My Dotfiles">...files</span></a>
</div></span></div>
<div class="flex flex-col gap-4">
<div style="width: 335px;"><i style="opacity: 0.8">Languages & Tools</i>  <span style="opacity: 0.5">──────────────────────────</span>

<div class="tech-container">
  <div class="tech-section">
    <i class="devicon-python-plain colored" style="font-size: 1.4em;" title="Python"></i> 
    <i class="devicon-java-plain colored" style="font-size: 1.4em;" title="Java"></i>
    <i class="devicon-csharp-plain" style="font-size: 1.4em;" title="C#"></i>
    <i class="devicon-c-line" style="font-size: 1.4em;" title="C"></i> 
    <i class="devicon-go-plain colored" style="font-size: 1.4em;" title="Go"></i>
    <i class="devicon-javascript-plain colored" style="font-size: 1.4em;" title="JavaScript"></i>
    <i class="devicon-typescript-plain colored" style="font-size: 1.4em;" title="TypeScript"></i>
    <i class="devicon-ocaml-plain colored" style="font-size: 1.4em;" title="OCaml"></i>
    <i class="devicon-rust-plain" style="font-size: 1.4em;" title="Rust"></i> 
    <i class="devicon-cplusplus-plain" style="font-size: 1.4em;" title="C++"></i> 
    <i class="devicon-lua-plain" style="font-size: 1.4em;" title="Lua"></i>
  </div>
</div>
<div class="tech-container">
  <div class="tech-section">
    <i class="devicon-unity-plain" style="font-size: 1.4em;" title="Unity"></i>
    <i class="devicon-react-original colored" style="font-size: 1.4em;" title="React"></i>
    <i class="devicon-nodejs-plain colored" style="font-size: 1.4em;" title="Node.js"></i>
    <i class="devicon-nextjs-plain" style="font-size: 1.4em;" title="Next.js"></i>
    <i class="devicon-flask-original" style="font-size: 1.4em;" title="Flask"></i>
    <i class="devicon-django-plain" style="font-size: 1.4em;" title="Django"></i>
    <div class="tech-section-divider"><span class="divider-text">Frameworks</span></div>
  </div>
</div>
<div class="tech-container">
  <div class="tech-section">
    <i class="devicon-amazonwebservices-plain-wordmark colored" style="font-size: 1.4em;" title="AWS"></i>
    <i class="devicon-git-plain colored" style="font-size: 1.4em;" title="Git"></i>
    <i class="devicon-docker-plain colored" style="font-size: 1.4em;" title="Docker"></i>
    <i class="devicon-nginx-original" style="font-size: 1.4em;" title="Nginx"></i>
    <i class="devicon-redis-plain colored" style="font-size: 1.4em;" title="Redis"></i>
    <i class="devicon-mysql-original" style="font-size: 1.4em;" title="MySQL"></i>
    <i class="devicon-azuresqldatabase-plain" style="font-size: 1.4em;" title="Azure SQL"></i>
    <div class="tech-section-divider"><span class="divider-text">DevOps</span></div>
  </div>
  </div>
  </div><span><i style="opacity: 0.8">Recents</i>  <span style="opacity: 0.5">──────────────────────────────────────────────────────────────</span>

  • I've been catching up on <a href="https://adventofcode.com/2024" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #90EE90; animation: inherit">Advent of Code 2024</span></a> in my <a href="https://github.com/stanley-utf8/advent-of-code-2024" target="_blank" class="text-light-blue dark:text-dark-blue">attempt</a> to learn Rust 
  • I developed <a href="https://github.com/stanley-utf8/chani" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #F18904; animation: inherit">Chani</span></a>, a command-line chatroom with OCaml using websockets and TCP
  • I helped program and compose a soundtrack for <a href="https://averageosiris.itch.io/datamines" target="_blank" style="text-decoration: none; "><span class="crt-text" style="color: #FFB6C1; animation: inherit">DATAMINES</span></a>,
    a retro 2D platformer <a href="https://github.com/CRook99/DATAMINES" target="_blank" class="text-light-blue dark:text-dark-blue">coded</a> in 36 hours 
</span>
</div>Type <span class='text-dark-green'>'help'</span> to see the list of available commands. <span style="opacity: 0.7">(p.s., you can tab-complete!)</span>
Type <span class='text-dark-green'>'work'</span>/<span class='text-dark-green'>'projects'</span> to see my relevant experience.
Type <span class='text-dark-green'>'about'</span> to repeat this output.\n
`;
};

export const mkdir = async (args: string[]): Promise<string> => {
  if (!args.length) return 'mkdir: missing operand';
  return `mkdir: cannot create directory '${args[0]}': Permission denied`;
};

export const rm = async (args: string[]): Promise<string> => {
  if (!args.length) return 'rm: missing operand';
  return `rm: cannot remove '${args[0]}': Permission denied`;
};

export const touch = async (args: string[]): Promise<string> => {
  if (!args.length) return 'touch: missing operand';
  return `touch: cannot touch '${args[0]}': Permission denied`;
};

export const sudo = async (args: string[]): Promise<string> => {
  return 'hah! nice try';
};

export const expand = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: expand <company-id> (e.g., expand autodesk)';
  }

  const targetId = args[0].toLowerCase();
  let found = false;

  workExperience.forEach((entry) => {
    entry.jobs.forEach((job) => {
      if (job.id === targetId) {
        job.expanded = true;
        found = true;
      }
    });
  });

  if (!found) {
    return `Company "${targetId}" not found. Available options: autodesk, beta, mcgill`;
  }

  return 'Case study expanded. Type "work" to see the updated view.';
};

export const collapse = async (args: string[]): Promise<string> => {
  if (!args.length) {
    return 'Usage: collapse <company-id> (e.g., collapse autodesk)';
  }

  const targetId = args[0].toLowerCase();
  let found = false;

  workExperience.forEach((entry) => {
    entry.jobs.forEach((job) => {
      if (job.id === targetId) {
        job.expanded = false;
        found = true;
      }
    });
  });

  if (!found) {
    return `Company "${targetId}" not found. Available options: autodesk, beta, mcgill`;
  }

  return 'Case study collapsed. Type "work" to see the updated view.';
};

export const work = async (args: string[]): Promise<string> => {
  return await workOutput();
};

export const projects = async (args: string[]): Promise<string> => {
  return await projectsOutput();
};


