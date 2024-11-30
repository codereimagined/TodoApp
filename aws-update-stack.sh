aws cloudformation update-stack \
  --stack-name CodeReimaginedTodoAppAWS \
  --template-body file://templates/main.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=codereimagined.com \
               ParameterKey=SubDomain,ParameterValue=todo-aws \
               ParameterKey=HostedZoneId,ParameterValue=Z04459842AKUPNLFRWG1F \
               ParameterKey=CreateApex,ParameterValue=no
