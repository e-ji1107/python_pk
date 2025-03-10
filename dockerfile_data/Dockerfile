#베이스 이미지
FROM ubuntu:22.04

#메타데이터 추가 (유지보수 하는 사람)
LABEL maintainer="EJ diddmswl1107@gmail.com"

# 시스템 업데이트
RUN apt update -y && \
       apt install -y sudo passwd openssh-server wget && \
       apt install -y nano net-tools iputils-ping openjdk-8-jdk python3-pip && \
       apt clean && \
       rm -rf /var/lib/apt/lists/*

# 계정 생성 및 세팅
RUN groupadd pkej && useradd -m -d /home/pkej -s /bin/bash -g pkej -G sudo pkej && \
       echo "pkej:1234" | chpasswd && \
       mkdir -p /home/pkej/.ssh && \
       chown -R pkej:pkej /home/pkej && \
       echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> /home/pkej/.bashrc && \
       echo "export PATH=$PATH /home/pkej/.local/bin >> /home/pkej/.bashrc &&\
       chown pkej:pkej /home/pkej/.bashrc && \
       mkdir -p /var/run/sshd && \
       echo "PermitRootLogin no" >> /etc/ssh/sshd_config && \
       echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config 

# 사용자 변경
USER pkej

# 작업환경 변경
WORKDIR /home/pkej

# pip 업그레이드 및 주피터랩 설치
RUN pip install --upgrade pip && pip install jupyterlab

# ssh 서버 실행 및 주피터랩 가동(외부접속 가능)
CMD ["/bin/bash","-c","service ssh start && python3 -m jupyterlab --ip=0.0.0.0 --port=8888 --allow-root"]