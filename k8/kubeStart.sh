#!/bin/sh
kubectl create -f ./kubMongoVolume.yaml
kubectl create -f ./kubMongoVolumeClaim.yaml
kubectl create -f ./kubMongo.yaml
kubectl create -f ./kubMongoService.yaml
kubectl create -f ./xcomm.yaml
kubectl get services