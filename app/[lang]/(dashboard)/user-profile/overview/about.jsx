"use client"
import { UserSign, Web, Mail2 } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';

const About = () => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-3 border-none">
        <CardTitle className="text-lg font-medium text-default-800">About</CardTitle>
        <Button
          size="icon"
          className="w-6 h-6 bg-default-100 dark:bg-default-50 text-default-500 hover:bg-default-100"
        >
          <Icon icon="heroicons:ellipsis-vertical" className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-default-600 mb-3">Hi I'm Mphilo Hlophe, head developer responsible for the development and management of Libertalia Properties.
            Full-stack developer with 5+ years of experience in building scalable web and mobile applications. Passionate about creating seamless user experiences and implementing efficient back-end solutions.
        </div>
        <div className="text-sm text-default-600">
        Programming Languages: (JavaScript, Python, Java).
        Frameworks/Libraries: (React, Next.js, Django, Flutter).
        Databases: (MongoDB, Firebase, PostgreSQL).
        DevOps Tools: (Docker, Kubernetes, Jenkins).
        Others: APIs, Cloud Services, Testing Tools.
        </div>
        <div className='mt-6 flex flex-wrap items-center gap-6 2xl:gap-16'>
          {
            [
              {
                title: "Designation",
                position: "Lead Developer",
                icon: UserSign
              },
              {
                title: "Designation",
                position: "Software Engineer",
                icon: Web
              },
              {
                title: "Mail",
                position: "lindimphilo@gmail.com",
                icon: Mail2
              }
            ].map((item, index) => (
              <div
                key={`about-${index}`}
                className="flex items-center gap-2">
                <div
                  className="bg-default-100 dark:bg-default-50 text-primary h-10 w-10 grid place-content-center rounded">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className='text-sm font-medium text-default-800 '>{item.title}</div>
                  <div className="text-xs font-medium text-default-600">{item.position}</div>
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default About;