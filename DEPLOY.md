# Make SFTP ony user:

See https://serverfault.com/q/420457

```
sudo adduser sftpuser --disabled-password
sudo passwd sftpuser # won't work without passwor set
```

# Disable sftpuser SSH login, only SFTP

```
$ sudo nano /etc/ssh/sshd_config.d/99-local.conf
...
# Only allow sftp for sftpuser
Match User scpuser
  ForceCommand internal-sftp
  PermitTunnel no
  AllowAgentForwarding no
  AllowTcpForwarding no
  X11Forwarding no
```

```
sudo systemctl restart ssh
~OR~
sudo systemctl restart sshd
```
