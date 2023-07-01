# Jenkins Instance creation

### Pre-requirements:

* Docker or podman installed.
* docker-compose or podman-compose installed.

---

## Docker process:

### Locally run **docker** container.

```
docker run -itd --privileged -p 9090:8080 --name jenkins -v jenkins-data:/var/jenkins_home -e ADMIN_PASSWORD=password quay.io/mariesillo/jenkins:ubi
```

You can reach your Jenkins instance at:

http://localhost:9090

### Run container using **docker-compose**.

Please change parameters accordingly. ENV Vars and published PORTS must be defined.

```
docker-compose -f jenkins-compose.yaml up -d
```

```
docker-compose -f jenkins-compose.yaml logs -f
```

```
docker-compose -f jenkins-compose.yaml ps
```

You can reach your Jenkins instance at:

http://localhost:9090


### Run container using selfsigned certificates and nginx reverse proxy.

Please change parameters accordingly. ENV Vars and published PORTS must be defined.

```
docker-compose -f jenkins-compose-tls.yaml up -d
```

```
docker-compose -f jenkins-compose-tls.yaml logs -f
```

```
docker-compose -f jenkins-compose-tls.yaml ps
```

You can reach your Jenkins instance at:

https://localhost

---

## Podman Process

### Locally run **podman** container.

```
podman run -itd --privileged -p 9090:8080 --name jenkins -v jenkins-data:/var/jenkins_home -e ADMIN_PASSWORD=password quay.io/mariesillo/jenkins:ubi
```

You can reach your Jenkins instance at:

http://localhost:9090


### Run container using **docker-compose**.

Please change parameters accordingly. ENV Vars and published PORTS must be defined.

```
podman-compose -f jenkins-compose.yaml up -d
```

```
podman-compose -f jenkins-compose.yaml logs -f
```

```
podman-compose -f jenkins-compose.yaml ps
```

You can reach your Jenkins instance at:

http://localhost:9090


###  Run container using selfsigned certificates and nginx reverse proxy.

Please change parameters accordingly

```
podman-compose -f podman-compose-tls.yaml up -d
```

```
podman-compose -f podman-compose-tls.yaml logs -f
```

```
podman-compose -f podman-compose-tls.yaml ps
```

You can reach your Jenkins instance at:

https://localhost

