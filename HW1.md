##Concepts

###1. Idempotent

Imdempotence is a part of configuration management theory.<br> It means that multiple applications of the same action do not have side effects on the system state." <br>

####<u>Examples of an idempotent operation is </u>

1. #####mkdir -p 

		mkdir -p New_Folder


	mkdir creates a new folder named New_Foder in the present directory. Adding a -p checks the present directory. If there is a folder with the same name then no action will be taken else a new folder will be created. <br>No matter how many times we run this command, it will result in that tree being created
<br>

2. ##### lininfile


		- hosts: all
		  connection: local
		  gather_facts: no
		  tasks:
		  - command: /usr/bin/ssh-keyscan -H {{ ansible_host }}
		    register: keyscan
		  - lineinfile: name=~/.ssh/known_hosts create=yes line={{ item }}
		    with_items: '{{ keyscan.stdout_lines }}'
				

	lineinfile ensures a particular line is in a file, or replace an existing line using a back-referenced regular expression.
<br>

> Put simply, an idempotent operation is one which can be applied multiple times without causing the result to diverge from the desired state.
> 


####<u>Examples of an Non-idempotent operation is </u>

1. ##### Appending output operator >> 

		ssh-keyscan -H >> ~/.ssh/known_hosts

	Redirection of output in this fashion causes the file whose name results from the expansion of word to be opened  for  appending  on  file  descriptor  n, or the standard output (file descriptor 1) if n is not specified.  If the file does not exist it is created.
2. #####mkdir

<hr>
###2. Issues related to management of inventory:

Inventory management is about capturing the basics:

* What assets are on hand (Like Servers and IP addresses).
* Where they reside and who owns them (Roles).
* It’s about maintaining an accurate, up-to-date view of owned hardware and software assets (hubs, routers, switches etc)
* So that at any time you can see an “actual state” of the components that comprise your infrastructure

<hr>
###3. Two configuration models. Disadvantages and Advantages.

Two configuration models are: 

* Push Model
* Pull Model


	<strong><u>Push Model:</u>	</strong> <br>
	In push mode, the user initiates configuration processing via the Start-DscConfiguration cmdlet. This command immediately applies the configuration to the target, which can be specified by the –ComputerName parameter of the Start-DscConfiguration DSC cmdlet. By default, this cmdlet uses the files in the -Path folder to find the target node details.

	Example: Ansible.
	
	<strong>Advantages of a 'push' system are:</strong><br>
	* <b>Control</b>: everything is synchronous, and under your control. You can see right away is something went wrong, and you can correct it immediately.
	* <b>Simplicity:</b> in the case of Fabric, a 'fabfile' is just a collection of Python functions that copy files over to a remote server and execute commands over ssh on that server; it's all very easy to set up and run
	
	<strong>Disadvantages of a 'push' system are:</strong><br>
	
	* The problem with push based systems is that we need to have a complete model of the entire architecture on the central push node. We can't push to a machine that we don't know about.
	* A push based system puts all the control hands of the central admins. It can be very hard to manage complexity that way.
	* Maintaining the list of all the commissioned machines might become a nightmare.

	<strong><u>Pull Model:</u></strong><br>
	Pulling a configuration requires that a series of steps be taken on the pull server and target nodes. 

	Each one of the pull clients has a scheduled task that performs a periodic compliance check on the configuration of the node. When the event is triggered the first time, it causes the Local Configuration Manager (LCM) on the pull client to validate the configuration. If the pull client is configured as desired, nothing happens. Otherwise, the LCM makes a request to the pull server to get a given configuration.

	Example: Puppet, Chef etc.
	
	<strong>Advantages of a 'pull' system are:</strong><br>

	* In a 'pull' system, clients contact the server independently of each other.
	* The system as a whole is more scalable than a 'push' system.
	* We can add more pull-masters than push-agents.

	<strong>Disadvantages of a 'pull' system are:</strong><br>

<hr>
####4. What are some of the consquences of not having proper configuration management?
	
Configuration Management (CM) ensures that the current design and build state of the system is known, good & trusted; and doesn’t rely on the tacit knowledge of the development team.<br>
Being able to access an accurate historical record of system state is very useful – not only for project management and audit purposes, but for development activities such as debugging (for example, knowing what has changed between one set of tests and the next to help identify what could possibly be causing a fault).<br>
Some of the major benefits that will be lost by not having proper configuration management are:

* Decreased efficiencies, stability and control because of less visibility and tracking.
* Cost will increase by not having detailed knowledge of all the elements of the configuration which allows for unnecessary duplication to be avoided.
* The ability to define and enforce formal policies and procedures that govern asset identification, status monitoring, and auditing will not be there.

If configuration management is not properly managed, this will lead to greater costs later on like:

* Figuring out which system components to change when requirements change.
* Re-doing an implementation because you implemented to meet requirements that had changed and you didn’t communicate that to all parties.
* Losing productivity when you replace a component with a flawed new version and can’t quickly revert to a working state.
* Replacing the wrong component because you couldn’t accurately determine which component needed replacing.




